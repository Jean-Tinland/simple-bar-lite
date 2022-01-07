import * as Settings from './settings'

const settings = Settings.get()
const { slidingAnimationPace } = settings

export const start = (container, innerSelector, sliderSelector) => {
  if (!container) return
  const inner = container.querySelector(innerSelector)
  const slider = container.querySelector(sliderSelector)
  const delta = inner.clientWidth - slider.clientWidth
  if (delta > 0) return
  const timing = Math.round((Math.abs(delta) * 100) / slidingAnimationPace)
  Object.assign(slider.style, {
    transform: `translateX(${delta}px)`,
    transition: `transform ${timing}ms linear`
  })
}

export const stop = (container, sliderSelector) => {
  if (!container) return
  container.querySelector(sliderSelector).removeAttribute('style')
}
