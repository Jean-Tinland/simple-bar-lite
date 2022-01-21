import * as Uebersicht from 'uebersicht'
import * as ClassNames from '../services/classnames'

const Widget = ({ className, onClickCommand, getter, refreshOnClick, style, children }) => {
  const onClick = async () => {
    if (refreshOnClick) {
      await getter()
    }

    if (onClickCommand) {
      await Uebersicht.run(onClickCommand)
    }
  }

  const classes = ClassNames.build('spl-widget', className, {
    'spl-widget--clickable': onClickCommand
  })

  return (
    <div className={classes} style={style} onClick={(onClickCommand || refreshOnClick) && onClick}>
      {children}
    </div>
  )
}

export default Widget