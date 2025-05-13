import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import Widget from './widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const { React } = Uebersicht

const settings = Settings.get()
const { dateTime } = settings.dataWidgets
const { color, formatOptions, locale, overrideFormatOptions, onClickCommand, refreshOnClick, refreshFrequency } =
  dateTime

const DateTime = () => {
  const [output, setOutput] = React.useState()

  const getDateTime = () => {
    const date = new Date()
    const formatter = new Intl.DateTimeFormat(locale, overrideFormatOptions || formatOptions)
    setOutput(formatter.format(date))
  }

  useWidgetRefresh(getDateTime, refreshFrequency)

  if (!output) return null

  return (
    <Widget
      className="spl-date-time"
      getter={getDateTime}
      onClickCommand={onClickCommand}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {output}
    </Widget>
  )
}

export default DateTime
