import { assertNormalMethodDecorator, assertStaticMethodDecorator } from "./asserts"
import { bindedMethods } from "./binded-methods"
import { getTargetInstance } from "./helpers"
import type { ConstructorType, OriginalMethod, OriginalMethodHandler } from "./types"

export const defineMethodDecorator = <DecoratorArgs extends (...args: any[]) => void, MethodType = (...args: any[]) => any>(
  decoratorName: string,
  handler: OriginalMethodHandler<DecoratorArgs>,
) =>
    (...args: Parameters<DecoratorArgs>) =>
      (target: object, property: string, descriptor: TypedPropertyDescriptor<MethodType>): void => {
        property = property + ""
        assertNormalMethodDecorator(decoratorName, target, property)
        
        const constructor = target.constructor as ConstructorType<any>
        
        const originalMethod = descriptor.value
        if (!(originalMethod instanceof Function)) {
          throw new Error(
          `[@${decoratorName}] ` +
          `${constructor.name}.${property} must be callable`,
          )
        }

        const instance = getTargetInstance(target)
        const bindedMethod = originalMethod.bind(instance) as OriginalMethod
        const instanceMethods = bindedMethods.get(instance) || []

        instanceMethods.push(bindedMethod)
        bindedMethods.set(instance, instanceMethods)

        handler(bindedMethod, ...args)
      }

export const defineStaticMethodDecorator = <DecoratorArgs extends (...args: any[]) => void, MethodType = (...args: any[]) => any>(
  decoratorName: string,
  handler: OriginalMethodHandler<DecoratorArgs>,
) =>
    (...args: Parameters<DecoratorArgs>) =>
      (target: object, property: string, descriptor: TypedPropertyDescriptor<MethodType>): void => {
        property = property + ""
        assertStaticMethodDecorator(decoratorName, target, property)
        
        const originalMethod = descriptor.value
        if (!(originalMethod instanceof Function)) {
          throw new Error(
          `[@${decoratorName}] ` +
          `static ${target}.${property} must be callable`,
          )
        }

        handler(originalMethod.bind(target), ...args)
      }

export const defineDestroyBindedMethodsMethodDecorator = <DecoratorArgs extends (...args: any[]) => void>(
  decoratorName: string,
  handler: (registeredMethods: OriginalMethod[], ...decoratorArgs: Parameters<DecoratorArgs>) => void,
) =>
    (...decoratorArgs: Parameters<DecoratorArgs>) =>
      (target: object, property: string, descriptor: PropertyDescriptor): void => {
        property = property + ""
        assertNormalMethodDecorator(decoratorName, target, property)
        
        const originalMethod = descriptor.value
        if (!(originalMethod instanceof Function)) {
          throw new Error(
          `[@${decoratorName}] ` +
          `${target.constructor.name}.${property} must be callable`,
          )
        }

        descriptor.value = function (...args: any[]) {
          originalMethod.apply(this, args)

          const instance = getTargetInstance(target)
  
          const methods = bindedMethods.get(instance)
  
          if (!methods) {
            console.error(
              `[@${decoratorName}] ` +
              `${target.constructor.name}.${property} no decorated methods`
            )
            return
          }
  
          handler(methods, ...decoratorArgs)
        }
      }