import * as Uebersicht from 'uebersicht'

const useWidgetRefresh = (getter, refreshFrequency) => {
  Uebersicht.React.useEffect(() => {
    getter()
    const interval = setInterval(getter, refreshFrequency)
    return () => clearInterval(interval)
  }, [])
}
export default useWidgetRefresh
