import * as Uebersicht from 'uebersicht'

const useWidgetRefresh = (getter, refreshFrequency) => {
  Uebersicht.React.useEffect(() => {
    const init = async () => {
      await getter()
    }
    init()
    const interval = setInterval(getter, refreshFrequency)
    return () => clearInterval(interval)
  }, [])
}
export default useWidgetRefresh
