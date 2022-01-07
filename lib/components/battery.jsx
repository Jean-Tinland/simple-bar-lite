import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import * as Output from '../services/output'
import * as ClassNames from '../services/classnames'
import * as Icons from './icons.jsx'
import Widget from './widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { battery } = settings.dataWidgets
const { color, onClickCommand, refreshOnClick, refreshFrequency } = battery

const getTransform = (value) => {
  let transform = `0.${value}`
  if (value === 100) transform = '1'
  if (value < 10) transform = `0.0${value}`
  return `scaleX(${transform})`
}

const Battery = () => {
  const [output, setOutput] = Uebersicht.React.useState()

  const getBattery = async () => {
    const [percentage, status, caffeinate] = await Promise.all([
      Uebersicht.run(`pmset -g batt | egrep '([0-9]+%).*' -o --colour=auto | cut -f1 -d'%'`),
      Uebersicht.run(`pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19`),
      Uebersicht.run(`pgrep caffeinate`)
    ])
    setOutput({
      percentage: parseInt(percentage),
      charging: Output.cleanup(status) === 'AC',
      caffeinate: Output.cleanup(caffeinate)
    })
  }

  useWidgetRefresh(getBattery, refreshFrequency)

  if (!output) return null

  const { percentage, charging, caffeinate } = output
  const isLowBattery = !charging && percentage < 20

  const classes = ClassNames.build('spl-battery', {
    'spl-battery--low': isLowBattery,
    'spl-battery--caffeinate': caffeinate.length
  })

  const transformValue = getTransform(percentage)

  return (
    <Widget
      className={classes}
      getter={getBattery}
      onClickCommand={onClickCommand}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {caffeinate.length > 0 && <span className="spl-battery__caffeinate-indicator">+</span>}
      <div className="spl-battery__icon">
        <div className="spl-battery__icon-inner">
          {charging && <Icons.Charging className="spl-battery__charging-icon" />}
          <div className="spl-battery__icon-filler" style={{ transform: transformValue }} />
        </div>
      </div>
      {percentage}%
    </Widget>
  )
}

export default Battery
