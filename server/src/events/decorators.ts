import * as alt from "alt-server"
import { defineTypedEventDecorator } from "@xshady/altv-decorators-shared"

export const onTyped = defineTypedEventDecorator("test", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onClientTyped = defineTypedEventDecorator("test", (originalMethod, eventName) => {
  alt.onClient(eventName, originalMethod)
})