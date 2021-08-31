import * as alt from "alt-server"
import { defineTypedEventDecorator } from "@xshady/altv-decorators-shared"
import type { AddPlayerParamToIEvents } from "./types"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onClientTyped = <T>() => 
  defineTypedEventDecorator("onClientTyped", (originalMethod, eventName) => {
    alt.onClient(eventName, originalMethod)
  })<AddPlayerParamToIEvents<T>>()

export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.onClient(eventName, originalMethod)
})<alt.IServerEvent>()