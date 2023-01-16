import * as Uebersicht from 'uebersicht'
import Widget from '../components/widget.jsx'
import useWidgetRefresh from '../hooks/use-widget-refresh'

const toJson = (res) => res.json()

const getWeatherLabel = ({ location, current, forecast1hour }) => {
  return `${location.city} ${location.country}, ${current.temp}°C, ${current.windDir} ${current.windSpeed}km/h, ${forecast1hour.temp}°C, ${forecast1hour.windDir} ${forecast1hour.windSpeed}km/h`
}

const Weather = ({ location = 'Gorinchem, ZH', refreshFrequency, refreshOnClick, color, classes }) => {
  const [output, setOutput] = Uebersicht.React.useState()

  const getWeather = async () => {
    const { current_condition, nearest_area, weather } = await fetch(`https://wttr.in/${location}?format=j1`).then(
      toJson
    )

    setOutput(
      getWeatherLabel({
        location: {
          city: nearest_area[0].areaName[0].value,
          country: nearest_area[0].country[0].value
        },
        current: {
          temp: current_condition[0].temp_C,
          windDir: current_condition[0].winddir16Point,
          windSpeed: current_condition[0].windspeedKmph
        },
        forecast1hour: {
          temp: weather[0].hourly[0].tempC,
          windDir: weather[0].hourly[0].winddir16Point,
          windSpeed: weather[0].hourly[0].windspeedKmph
        }
      })
    )
  }

  const onClickCommand = `open https://wttr.in/${location}`

  useWidgetRefresh(getWeather, refreshFrequency)

  return (
    <Widget
      className={classes}
      getter={getWeather}
      onClickCommand={onClickCommand}
      refreshOnClick={refreshOnClick}
      style={{ color }}
    >
      {output || ''}
    </Widget>
  )
}

export default Weather
