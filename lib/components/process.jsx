import * as Uebersicht from 'uebersicht'
import * as Slider from '../services/slider'

const Process = ({ currentWindow }) => {
  const ref = Uebersicht.React.useRef()

  if (!currentWindow) return null

  const { app, title } = currentWindow
  const processName = app !== title && title.length ? `${app} | ${title}` : app

  const onMouseEnter = () => Slider.start(ref.current, '.spl-process__inner', '.spl-process__name')
  const onMouseLeave = () => Slider.stop(ref.current, '.spl-process__name')

  return (
    <div ref={ref} className="spl-process" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <span className="spl-process__inner">
        <span className="spl-process__name">{processName}</span>
      </span>
    </div>
  )
}

export default Process
