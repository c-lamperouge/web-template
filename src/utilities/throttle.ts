type F = (...args: any[]) => any

type Throttle =
  <T extends F>(f: T, ms: number) =>
  (...args: Parameters<T>) => ReturnType<T> | void

const throttle: Throttle = (f, ms) => {
  let lastTriggerDate: number = 0

  return (...args) => {
    const now = Date.now()
    if (now - lastTriggerDate > ms) {
      lastTriggerDate = now
      return f(...args)
    }
  }
}

type AnimationFrameThrottle =
  <T extends F>(f: T) =>
  (...args: Parameters<T>) => ReturnType<T> | void

const animationFrameThrottle: AnimationFrameThrottle = (f) => {
  let isThrottling = false

  return (...args) => {
    if (!isThrottling) {
      isThrottling = true
      window.requestAnimationFrame(() => {
        isThrottling = false
      })

      return f(...args)
    }
  }
}

export {
  throttle,
  animationFrameThrottle
}
