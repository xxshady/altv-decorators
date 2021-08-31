import { defineMethodDecorator } from "../base-method-decorator"
import type { OriginalMethodHandler } from "../types"

type DecoratorEventArgs<T> = (eventName: T) => void
type OriginalMethod<T extends (...args: any[]) => void> = (...args: Parameters<T>) => unknown
type RegisterEventHandler<T> = OriginalMethodHandler<DecoratorEventArgs<T>>

export const defineTypedEventDecorator = (decoratorName: string, registerEvent: RegisterEventHandler<string>) =>
  <T extends Record<any, any>>() =>
    <K extends keyof T>(eventName: K) =>
      defineMethodDecorator<DecoratorEventArgs<K>, OriginalMethod<T[K]>>(decoratorName, registerEvent as RegisterEventHandler<K>)(eventName)