import alt from "alt-server"
import type { EventHandler } from "@xshady/altv-decorators-shared/dist/events"
import { BaseEvent } from "@xshady/altv-decorators-shared/dist/events"
import { ServerEventType } from "./enums"

export class ServerEventOn extends BaseEvent {
  public readonly type = ServerEventType.On

  public register (handler: EventHandler): void {
    alt.on(this.eventName, handler)
  }
}

export class ServerEventOnClient extends BaseEvent {
  public readonly type = ServerEventType.OnClient

  public register (handler: EventHandler): void {
    alt.onClient(this.eventName, handler)
  }
}