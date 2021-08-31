import { container } from "tsyringe"
import type { ConstructorType, OriginalMethodHandler } from "./types"

export const defineMethodDecorator = <DecoratorArgs extends (...args: any[]) => void, MethodType = (...args: any[]) => any>(
  decoratorName: string,
  handler: OriginalMethodHandler<DecoratorArgs>,
) =>
    (...args: Parameters<DecoratorArgs>) =>
      (target: object, property: string, descriptor: TypedPropertyDescriptor<MethodType>): void => {
        const originalMethod = descriptor.value
        property = property + ""

        const constructor = target.constructor as ConstructorType<any>

        if (!(originalMethod instanceof Function)) {
          throw new Error(
          `[@${decoratorName}] ` +
          `${constructor.name}.${property} must be callable`,
          )
        }

        if (!container.isRegistered(constructor)) {
          container.registerSingleton(constructor)
        }

        const instance = container.resolve<ConstructorType<any>>(
          constructor as ConstructorType<any>,
        )

        handler(originalMethod.bind(instance), ...args)
      }