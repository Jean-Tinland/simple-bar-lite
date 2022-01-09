import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import * as Output from '../services/output'
import Widget from './widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { customWidgets } = settings

const CustomWidget = ({ widget }) => {
  const [output, setOutput] = Uebersicht.React.useState()
  const {
    color = 'currentColor',
    command = 'echo "Hello Wold!"',
    onClickCommand,
    refreshOnClick,
    refreshFrequency = 10000,
    className
  } = widget

  const getter = async () => {
    const widgetOutput = await Uebersicht.run(command)
    setOutput(Output.cleanup(widgetOutput))
  }

  useWidgetRefresh(getter, refreshFrequency)

  return (
    <Widget
      className={className}
      onClickCommand={onClickCommand}
      getter={getter}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {output}
    </Widget>
  )
}

const CustomWidgets = () => {
  return customWidgets.map((widget, i) => widget.enabled && <CustomWidget key={i} widget={widget} />)
}

export default CustomWidgets
