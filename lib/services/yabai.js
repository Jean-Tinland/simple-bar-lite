import * as Uebersicht from 'uebersicht'
import * as Settings from './settings'

const settings = Settings.get()
const { yabaiPath } = settings

export const goToSpace = (index) => Uebersicht.run(`${yabaiPath} -m space --focus ${index}`)

export const switchSpace = async (currentIndex, desiredIndex) => {
  const repeats = Math.abs(currentIndex - desiredIndex)
  const left = currentIndex > desiredIndex
  for (let i = 0; i < repeats; i++) {
    await Uebersicht.run(
      `osascript -e 'tell app "System Events" to key code ${left ? '123' : '124'} using control down'`
    )
  }
}
