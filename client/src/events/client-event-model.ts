import alt from "alt-client"
import { BaseEvent } from "@xshady/altv-decorators-shared/dist/events"
import type { EventHandler } from "@xshady/altv-decorators-shared/dist/events"
import { ClientEventType } from "./enums"

export class ClientEventOn extends BaseEvent {
  public readonly type = ClientEventType.On

  public register (handler: EventHandler): void {
    alt.on(this.eventName, handler)
  }
}

export class ClientEventOnServer extends BaseEvent {
  public readonly type = ClientEventType.OnServer

  public register (handler: EventHandler): void {
    alt.onServer(this.eventName, handler)
  }
}
