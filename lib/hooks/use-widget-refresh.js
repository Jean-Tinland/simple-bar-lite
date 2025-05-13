import * as Uebersicht from 'uebersicht'

const { React } = Uebersicht

const useWidgetRefresh = (getter, refreshFrequency) => {
  React.useEffect(() => {
    const init = async () => {
      await getter()
    }
    init()
    const interval = setInterval(getter, refreshFrequency)
    return () => clearInterval(interval)
  }, [getter, refreshFrequency])
}
export default useWidgetRefresh
