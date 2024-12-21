export const generatePath = <T extends Record<string, string | number>>(
  template: string,
  params: T
): string => {
  return Object.keys(params).reduce(
    (path, key) => path.replace(`:${key}`, String(params[key])),
    template
  )
}
