import * as alt from "alt-server"
import { defineTypedEventDecorator } from "altv-xdecorators-shared"
import type { AddPlayerParamToIEvents } from "./types"
import type { RegisterEventHandler } from "altv-xdecorators-shared/dist/events/types"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const defineOnClientTyped = <T>(decoratorName: string, registerEvent: RegisterEventHandler<string>) => 
  defineTypedEventDecorator(decoratorName, registerEvent)<AddPlayerParamToIEvents<T>>()

export const onClientTyped = <T>() => 
  defineOnClientTyped<T>('onClientTyped', (originalMethod, eventName) => {
    alt.onClient(eventName, originalMethod)
  })


export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.onClient(eventName, originalMethod)
})<alt.IServerEvent>()