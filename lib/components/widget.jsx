import * as Uebersicht from 'uebersicht'
import * as ClassNames from '../services/classnames'

const Widget = ({ className, onClickCommand, getter, refreshOnClick, style, children }) => {
  const onClick = async () => {
    await Uebersicht.run(onClickCommand)
    if (refreshOnClick) {
      await getter()
    }
  }

  const classes = ClassNames.build('spl-widget', className, {
    'spl-widget--clickable': onClickCommand
  })

  return (
    <div className={classes} style={style} onClick={onClickCommand && onClick}>
      {children}
    </div>
  )
}

export default Widget
