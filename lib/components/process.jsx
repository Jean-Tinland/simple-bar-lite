import * as Uebersicht from 'uebersicht'
import * as Slider from '../services/slider'

const getName = (app, title) => {
  if (!title.length || app === title) return app
  if (title.includes(app)) return title
  return `${app} | ${title}`
}

const Process = ({ currentWindow }) => {
  const ref = Uebersicht.React.useRef()

  if (!currentWindow) return null

  const { app, title } = currentWindow
  const processName = getName(app, title)

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
