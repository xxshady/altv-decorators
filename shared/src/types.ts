export type ConstructorType<T> = {
    new (...args: any[]): T
}

export type OriginalMethod = (...args: any[]) => unknown

export type OriginalMethodHandler<T extends (...args: any[]) => void> = (originalMethod: OriginalMethod, ...args: Parameters<T>) => void