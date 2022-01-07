import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import * as Output from '../services/output'
import * as ClassNames from '../services/classnames'
import Widget from './widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { dataWidgets } = settings

const symbols = {
  output: '>',
  input: '<'
}

const Sound = ({ kind }) => {
  const { color, onClickCommand, refreshOnClick, refreshFrequency } = dataWidgets[kind]
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

  const isMuted = muted === 'true' || (kind === 'input' && volume === '0')

  const classes = ClassNames.build('spl-sound', {
    'spl-sound--muted': isMuted
  })

  const symbol = symbols[kind]

  return (
    <Widget
      className={classes}
      getter={getSound}
      onClickCommand={onClickCommand}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {volume}% {symbol}
    </Widget>
  )
}

export default Sound
