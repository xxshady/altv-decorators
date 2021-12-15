import * as alt from "alt-client"

type EventHandler = (...args: any[]) => unknown

const bindedHandlers = new Map<EventHandler, string>()

export const bindOnServer = (eventName: string, handler: EventHandler) => {
    alt.onServer(eventName, handler)
    bindedHandlers.set(handler, eventName)
}

export const unbindOnServer = (handler: EventHandler) => {
    const eventName = bindedHandlers.get(handler)
    
    if (!eventName) {
        return console.error(`[@offServer] unknown handler: ${handler}`)
    }

    alt.offServer(eventName, handler)
    bindedHandlers.delete(handler)
}