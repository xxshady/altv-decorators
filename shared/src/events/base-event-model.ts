import { EventHandler } from "./types"

export abstract class BaseEvent {
  public abstract readonly type: number

  constructor (
    public readonly eventName: string,
    public readonly methodName: string,
  ) {}

  public abstract register (handler: EventHandler): void
}