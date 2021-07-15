import type { BaseEvent } from "../base-event-model"

export type EventModel = new(eventName: string, methodName: string) => BaseEvent

export type ClassPrototype = Record<string, any>
export type PropName = string

export type MethodEventDecorator<T, K extends keyof T> = (
  target: ClassPrototype,
  propertyName: PropName,
  descriptor: TypedPropertyDescriptor<T[K]>
) => void

export type MethodEventDecoratorCreator<T> = <K extends keyof T>(
  eventName: K
) => MethodEventDecorator<T, K>

export type BaseEventsList = BaseEvent[]