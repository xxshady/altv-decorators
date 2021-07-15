import { ServerEventOn, ServerEventOnClient } from "./server-event-model"
import { EventDecoratorManager } from "@xshady/altv-decorators-shared/dist/events"
import type { EventHandler } from "@xshady/altv-decorators-shared/dist/events"
import type { IServerEventReturnAny } from "./types"

export const onAlt = EventDecoratorManager.defineDecorator<IServerEventReturnAny>(
  "onAlt",
  ServerEventOn,
)

export const onClientTyped = EventDecoratorManager.defineGenericDecorator(
  "onClientTyped",
  ServerEventOnClient,
)

export const onClient = EventDecoratorManager.defineDecorator<Record<string, EventHandler>>(
  "onClient",
  ServerEventOnClient,
)