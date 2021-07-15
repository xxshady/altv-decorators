import type { IClientEvent } from "alt-client";

export type IClientEventReturnAny = {
  [K in keyof IClientEvent]: (...args: Parameters<IClientEvent[K]>) => any
}