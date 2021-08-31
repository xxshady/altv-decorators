import * as alt from "alt-client"
import { defineTypedEventDecorator } from "@xshady/altv-decorators-shared"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onServerTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.onServer(eventName, originalMethod)
})

export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})<alt.IClientEvent>()