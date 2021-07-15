import { GameEventsMetaDataName } from "."
import type { ConstructorType, ISharedEventsList } from "./types"

export const getConstructorEventsMetaData = (constructor: ConstructorType): ISharedEventsList | undefined => {
  return Reflect.getMetadata(GameEventsMetaDataName, constructor.prototype)
}