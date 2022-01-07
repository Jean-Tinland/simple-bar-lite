import * as Uebersicht from 'uebersicht'
import * as Settings from '../services/settings'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const settings = Settings.get()
const { dateTime } = settings.dataWidgets
const { color, formatOptions, locale, overrideFormatOptions, refreshFrequency } = dateTime

const DateTime = () => {
  const [output, setOutput] = Uebersicht.React.useState()

  const getDateTime = () => {
    const date = new Date()
    const formatter = new Intl.DateTimeFormat(locale, overrideFormatOptions || formatOptions)
    setOutput(formatter.format(date))
  }

  useWidgetRefresh(getDateTime, refreshFrequency)

  if (!output) return null

  return (
    <div className="spl-date-time" style={{ color }}>
      {output}
    </div>
  )
}

export default DateTime
