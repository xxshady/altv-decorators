import alt from "alt-shared"
import { EventableClassMetaDataName, GameEventsMetaDataName } from "./constants"
import { getConstructorEventsMetaData } from "./helpers"
import type { ConstructorType, ISharedEventsList } from "./types"

export const eventable = () => {
  return <T extends ConstructorType>(constructor: T): T => {
    alt.log(`[@eventable] used on class: ${constructor.name}`)

    Reflect.defineMetadata(EventableClassMetaDataName, true, constructor.prototype)

    return class extends constructor {
      constructor (...args: any[]) {
        super(...args)

        let events: ISharedEventsList | void = getConstructorEventsMetaData(constructor)

        alt.log(`[@eventable] called on class: ${constructor.name} events:`, events)

        if (!events) {
          alt.logWarning(`[@eventable] Used on class: ${constructor.name} but no events registered`)
          return
        }

        alt.nextTick(() => {
          events = getConstructorEventsMetaData(constructor)

          if (!events?.length) {
            alt.logWarning(`[@eventable] Used on class: ${constructor.name} no events in metadata: ${GameEventsMetaDataName}`)
            return
          }

          for (const event of events) {
            const method = this[event.methodName]
            event.register(method.bind(this))
          }
        })
      }
    }
  }
}