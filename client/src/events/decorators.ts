import * as alt from "alt-client"
import {
  defineDestroyBindedMethodsMethodDecorator,
  defineStaticTypedEventDecorator,
  defineTypedEventDecorator,
} from "altv-xxdecorators-shared"
import { bindOnServer, unbindOnServer } from "./on-server"

export const onTyped = defineTypedEventDecorator("onTyped", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})

export const onServerTyped = defineTypedEventDecorator("onServerTyped", (originalMethod, eventName) => {
  bindOnServer(eventName, originalMethod)
})

export const onServerTypedStatic = defineStaticTypedEventDecorator('onServerTypedStatic', (originalMethod, eventName) => {
  alt.onServer(eventName, originalMethod)
})

export const onAlt = defineTypedEventDecorator("onAlt", (originalMethod, eventName) => {
  alt.on(eventName, originalMethod)
})<alt.IClientEvent>()

export const offServer = defineDestroyBindedMethodsMethodDecorator<() => void>("offServer", (registeredMethods) => {
  for (const method of registeredMethods) {
    unbindOnServer(method)
  }
})