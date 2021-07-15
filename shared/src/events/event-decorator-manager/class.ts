import alt from "alt-shared"
import { EventableClassMetaDataName, GameEventsMetaDataName } from "../constants"
import type {
  MethodEventDecoratorCreator,
  MethodEventDecorator,
  ClassPrototype,
  PropName,
  EventModel,
  BaseEventsList,
} from "./types"

export class EventDecoratorManager {
  public defineDecorator <T> (decoratorName: string, EventModel: EventModel): MethodEventDecoratorCreator<T> {
    return <K extends keyof T>(eventName: K): MethodEventDecorator<T, K> =>
      this.eventDecorator<T, K>(decoratorName, EventModel, eventName)
  }

  public defineGenericDecorator (decoratorName: string, EventModel: EventModel): <T>() => MethodEventDecoratorCreator<T> {
    return <T>() =>
      <K extends keyof T>(eventName: K): MethodEventDecorator<T, K> =>
        this.eventDecorator<T, K>(decoratorName, EventModel, eventName)
  }

  private defineEventsMetadata (eventsList: BaseEventsList, target: ClassPrototype): void {
    Reflect.defineMetadata(GameEventsMetaDataName, eventsList, target)
  }

  private eventDecorator<T, K extends keyof T> (
    decoratorName: string,
    EventModel: EventModel,
    eventName: K,
  ): MethodEventDecorator<T, K> {
    return (
      target: ClassPrototype,
      propertyName: PropName,
      descriptor: TypedPropertyDescriptor<T[K]>,
    ): void => {
      const originalMethod = descriptor.value
      propertyName = propertyName + ""

      if (!(originalMethod instanceof Function)) {
        throw new Error(
          `[@${decoratorName}("${eventName}")] ` +
          `method "${propertyName}" must be callable`,
        )
      }

      this.defineEventsMetadata([] as BaseEventsList, target)

      alt.nextTick(() => {
        if (!Reflect.getMetadata(EventableClassMetaDataName, target)) {
          throw new Error(
            `[@${decoratorName}] property: ${propertyName} ` +
            `class: ${target.constructor.name} must be @eventable`,
          )
        }

        alt.log(
          `[@${decoratorName}] class: ${target.constructor.name}`,
          `method: ${propertyName} event: ${eventName}`,
        )

        const eventsList: BaseEventsList = Reflect.getMetadata(
          GameEventsMetaDataName,
          target,
        ) || []

        eventsList.push(new EventModel(
            eventName as string,
            propertyName,
        ))

        this.defineEventsMetadata(eventsList, target)
      })
    }
  }
}