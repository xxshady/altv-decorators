import type { IServerEvent } from "alt-server";

export type IServerEventReturnAny = {
  [K in keyof IServerEvent]: (...args: Parameters<IServerEvent[K]>) => any
}
