export const assertNormalMethodDecorator = (
  decoratorName: string,
  classPrototype: unknown,
  property: string,
): void => {
  if (typeof classPrototype === 'object') return

  throw new Error(
      `@${decoratorName}(...) ` +
          `used on property or method: ${property}. This decorator can only be used on normal methods (not static)`,
  )
}

export const assertStaticMethodDecorator = (
  decoratorName: string,
  classStatic: unknown,
  property: string,
): void => {
  if (typeof classStatic === 'function') return

  throw new Error(
      `@${decoratorName}(...) ` +
          `used on property or method: ${property}. This decorator can only be used on static methods`,
  )
}