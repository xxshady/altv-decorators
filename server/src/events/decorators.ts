import * as alt from "alt-server"
import { defineTypedEventDecorator } from "@xshady/altv-decorators-shared"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onClientTyped = defineTypedEventDecorator("onClientTyped", (originalMethod, eventName) => {
  alt.onClient(eventName, originalMethod)
})

export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.onClient(eventName, originalMethod)
})<alt.IServerEvent>()