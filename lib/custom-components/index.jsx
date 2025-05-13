import * as Settings from '../services/settings'
import Weather from './weather.jsx'

const theCustomComponents = {
  // add your custom components here
  // key = name of the component as used in settings
  // value = the component itself
  weather: Weather
}

const { customComponents } = Settings.get()

const CustomComponents = () => {
  return customComponents.map((component) => {
    component = Object.assign({ refreshFrequency: 60000, refreshOnClick: false, color: '', classes: '' }, component)

    const { name, enabled } = component
    if (!enabled) return undefined

    const Component = theCustomComponents[name]
    if (!Component) return undefined

    return <Component {...component} key={name} />
  })
}

export default CustomComponents
