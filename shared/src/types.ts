export type ConstructorType<T> = {
    new (...args: any[]): T
}

export type OriginalMethodHandler<T extends (...args: any[]) => void> = (originalMethod: (...args: any[]) => unknown, ...args: Parameters<T>) => void