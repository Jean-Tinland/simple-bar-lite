import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import * as Output from '../services/output'
import * as ClassNames from '../services/classnames'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { dataWidgets } = settings

const symbols = {
  output: '>',
  input: '<'
}

const Sound = ({ kind }) => {
  const { color, refreshFrequency } = dataWidgets[kind]
  const [output, setOutput] = Uebersicht.React.useState()

  const getSound = async () => {
    const volume = await Uebersicht.run(`osascript -e 'set ovol to ${kind} volume of (get volume settings)'`)
    let muted = ''
    if (kind === 'output') {
      muted = await Uebersicht.run(`osascript -e 'set ovol to output muted of (get volume settings)'`)
    }
    setOutput({ volume: Output.cleanup(volume), muted: Output.cleanup(muted) })
  }

  useWidgetRefresh(getSound, refreshFrequency)

  if (!output || !kind) return null
  const { volume, muted } = output

  const classes = ClassNames.build('spl-sound', {
    'spl-sound--muted': muted
  })

  const symbol = symbols[kind]

  return (
    <div className={classes} style={{ color }}>
      {volume}% {symbol}
    </div>
  )
}

export default Sound
