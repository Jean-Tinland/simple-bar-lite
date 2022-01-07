export const parse = (json) => {
  try {
    return JSON.parse(json)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error, json)
    return undefined
  }
}
