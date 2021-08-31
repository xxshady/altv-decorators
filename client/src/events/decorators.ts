import * as alt from "alt-client"
import { defineTypedEventDecorator } from "@xshady/altv-decorators-shared"

export const onTyped = defineTypedEventDecorator("test", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onServerTyped = defineTypedEventDecorator("test", (originalMethod, eventName) => {
  alt.onServer(eventName, originalMethod)
})