import { container } from "tsyringe"
import { ConstructorType } from "./types"

export const getTargetInstance = (target: object) => {
  const constructor = target.constructor as ConstructorType<any>

  if (!container.isRegistered(constructor)) {
    container.registerSingleton(constructor)
  }

  const instance = container.resolve<ConstructorType<any>>(
    constructor as ConstructorType<any>,
  )

  return instance
}