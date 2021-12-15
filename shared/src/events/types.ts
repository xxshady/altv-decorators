import type { OriginalMethodHandler } from "../types"

export type DecoratorEventArgs<T> = (eventName: T) => void
export type OriginalMethod<T extends (...args: any[]) => void, S = any> = (...args: Parameters<T>) => S
export type RegisterEventHandler<T> = OriginalMethodHandler<DecoratorEventArgs<T>>