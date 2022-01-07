import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import * as Output from '../services/output'
import * as ClassNames from '../services/classnames'
import Widget from './widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { network } = settings.dataWidgets
const { color, device, onClickCommand, refreshOnClick, refreshFrequency } = network

const renderName = (name) => {
  if (!name) return ''
  if (name === 'with an AirPort network.y off.') return 'Disabled'
  if (name === 'with an AirPort network.') return 'Searching...'
  return name
}

const Network = () => {
  const [output, setOutput] = Uebersicht.React.useState()

  const getNetwork = async () => {
    const [status, ssid] = await Promise.all([
      Uebersicht.run(`ifconfig ${device} | grep status | cut -c 10-`),
      Uebersicht.run(`networksetup -getairportnetwork ${device} | cut -c 24-`)
    ])
    setOutput({ status: Output.cleanup(status), ssid: Output.cleanup(ssid) })
  }

  useWidgetRefresh(getNetwork, refreshFrequency)

  if (!output) return null

  const { status, ssid } = output
  const name = renderName(ssid)

  const classes = ClassNames.build('spl-network', { 'spl-network--active': status === 'active' })

  return (
    <Widget
      className={classes}
      getter={getNetwork}
      onClickCommand={onClickCommand}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {name}
    </Widget>
  )
}

export default Network
