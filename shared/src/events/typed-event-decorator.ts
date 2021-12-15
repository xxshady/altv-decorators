import { defineStaticMethodDecorator } from ".."
import { defineMethodDecorator } from "../base-method-decorator"
import type {
  RegisterEventHandler,
  DecoratorEventArgs,
  OriginalMethod
} from "./types"

/**
 * @todo add {@link OriginalMethod} return type support
 */

export const defineTypedEventDecorator = (decoratorName: string, registerEvent: RegisterEventHandler<string>) =>
  <T extends Record<any, any>>() =>
    <K extends keyof T>(eventName: K) =>
      defineMethodDecorator<DecoratorEventArgs<K>, OriginalMethod<T[K]>>(decoratorName, registerEvent as RegisterEventHandler<K>)(eventName)

export const defineStaticTypedEventDecorator = (decoratorName: string, registerEvent: RegisterEventHandler<string>) =>
<T extends Record<any, any>>() =>
  <K extends keyof T>(eventName: K) =>
    defineStaticMethodDecorator<DecoratorEventArgs<K>, OriginalMethod<T[K]>>(decoratorName, registerEvent as RegisterEventHandler<K>)(eventName)