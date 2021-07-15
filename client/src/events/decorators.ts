import { ClientEventOn, ClientEventOnServer } from "./client-event-model"
import { EventDecoratorManager } from "@xshady/altv-decorators-shared/dist/events"
import type { IClientEventReturnAny } from "./types"
import type { EventHandler } from '@xshady/altv-decorators-shared/dist/events/types'

export const onAlt = EventDecoratorManager.defineDecorator<IClientEventReturnAny>(
  "onAlt",
  ClientEventOn,
)

export const onServerTyped = EventDecoratorManager.defineGenericDecorator(
  "onServerTyped",
  ClientEventOnServer,
)

export const onServer = EventDecoratorManager.defineDecorator<Record<string, EventHandler>>(
  "onServer",
  ClientEventOnServer,
)