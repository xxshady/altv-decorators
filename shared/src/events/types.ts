import type { BaseEvent } from "./base-event-model"

export type ISharedEventsList = BaseEvent[]
export type ConstructorType = { new (...args: any[]): any }

export type EventHandler = (...args: any[]) => any