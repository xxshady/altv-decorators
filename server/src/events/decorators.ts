import * as alt from "alt-server"
import { defineStaticTypedEventDecorator, defineTypedEventDecorator } from "altv-xxdecorators-shared"
import type { AddPlayerParamToIEvents } from "./types"
import type { RegisterEventHandler } from "altv-xxdecorators-shared/dist/events/types"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onTypedStatic = defineStaticTypedEventDecorator("onTypedStatic", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const defineOnClientTyped = <T>(decoratorName: string, registerEvent: RegisterEventHandler<string>) => 
  defineTypedEventDecorator(decoratorName, registerEvent)<AddPlayerParamToIEvents<T>>()

export const defineOnClientTypedStatic = <T>(decoratorName: string, registerEvent: RegisterEventHandler<string>) => 
  defineStaticTypedEventDecorator(decoratorName, registerEvent)<AddPlayerParamToIEvents<T>>()

export const onClientTyped = <T>() => 
  defineOnClientTyped<T>('onClientTyped', (originalMethod, eventName) => {
    alt.onClient(eventName, originalMethod)
  })

export const onClientTypedStatic = <T>() => 
  defineOnClientTypedStatic<T>('onClientTypedStatic', (originalMethod, eventName) => {
    alt.onClient(eventName, originalMethod)
  })

export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})<alt.IServerEvent>()

export const onAltStatic = defineStaticTypedEventDecorator("onAltStatic", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})<alt.IServerEvent>()