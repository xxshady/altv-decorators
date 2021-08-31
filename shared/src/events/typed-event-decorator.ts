import { defineMethodDecorator } from "../base-method-decorator"
import type {
  RegisterEventHandler,
  DecoratorEventArgs,
  OriginalMethod
} from "./types"

export const defineTypedEventDecorator = (decoratorName: string, registerEvent: RegisterEventHandler<string>) =>
  <T extends Record<any, any>>() =>
    <K extends keyof T>(eventName: K) =>
      defineMethodDecorator<DecoratorEventArgs<K>, OriginalMethod<T[K]>>(decoratorName, registerEvent as RegisterEventHandler<K>)(eventName)