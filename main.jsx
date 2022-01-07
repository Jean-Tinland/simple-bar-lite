import Space from './lib/components/space.jsx'
import Process from './lib/components/process.jsx'
import Battery from './lib/components/battery.jsx'
import Sound from './lib/components/sound.jsx'
import DateTime from './lib/components/date-time.jsx'
import Network from './lib/components/network.jsx'

import * as Settings from './lib/services/settings'
import * as Json from './lib/services/json'
import * as Output from './lib/services/output'
import * as Styles from './lib/services/styles'
import * as ClassNames from './lib/services/classnames'

const refreshFrequency = false

const settings = Settings.get()
const { yabaiPath, shell, dataWidgets } = settings
const { battery, dateTime, network, output: soundOutput, input: soundInput } = dataWidgets

const command = `${shell} simple-bar-lite/lib/scripts/init.sh ${yabaiPath}`

Styles.inject('simple-bar-lite-spaces', [Styles.variables])
Styles.load('simple-bar-lite/lib/styles/index.css', 'simple-bar-lite-styles')

const render = ({ output, error }) => {
  if (!output || error) return null

  const cleanedOutput = Output.cleanup(output)
  if (cleanedOutput === 'yabai_error') return null

  const json = Json.parse(cleanedOutput)
  if (!json) return null

  const { currentWindow, displays, spaces, sip, shadow } = json
  const displayId = parseInt(window.location.pathname.replace('/', ''))
  const displayIndex = displays.find((d) => d.id === displayId).index
  const { index: currentSpaceIndex } = spaces.find((space) => space.display === displayIndex)

  const classes = ClassNames.build('spl-bar', { 'spl-bar--no-shadow': shadow !== 'on' })

  return (
    <div className={classes}>
      {spaces.map((space, index) => (
        <Space key={index} currentSpaceIndex={currentSpaceIndex} displayIndex={displayIndex} space={space} sip={sip} />
      ))}
      <Process currentWindow={currentWindow} />
      <div className="spl-bar__data">
        {network.enabled && <Network />}
        {soundOutput.enabled && <Sound kind="output" />}
        {soundInput.enabled && <Sound kind="input" />}
        {battery.enabled && <Battery />}
        {dateTime.enabled && <DateTime />}
      </div>
    </div>
  )
}

export { command, refreshFrequency, render }
