import type alt from "alt-server"

export type AddPlayerParamToIEvents<T extends Record<any, any>> = {
    [K in keyof T]: (
        player: alt.Player,
        ...args: Parameters<T[K]>
    ) => ReturnType<T[K]>
}