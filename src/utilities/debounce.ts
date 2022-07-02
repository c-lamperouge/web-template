type F = (...args: any[]) => void

type DeBounce =
  <T extends F>(f: T, ms: number) =>
  (...args: Parameters<T>) => void

const debounce: DeBounce = (f, ms) => {
  let timeoutID: number

  return (...args) => {
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      f(...args)
    }, ms)
  }
}

export {
  debounce
}
