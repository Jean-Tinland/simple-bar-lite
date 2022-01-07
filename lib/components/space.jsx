import * as ClassNames from '../services/classnames'
import * as Yabai from '../services/yabai'

const Space = ({ currentSpaceIndex, displayIndex, space, sip }) => {
  const {
    index,
    'has-focus': hasFocus,
    'is-visible': isVisible,
    'first-window': firstWindow,
    'last-window': lastWindow,
    'is-native-fullscreen': isNativeFullscreen,
    display: spaceDisplayId,
    label
  } = space

  if (spaceDisplayId !== displayIndex) return null

  const sipDisabled = sip !== 'System Integrity Protection status: enabled.'

  const onClick = () => {
    if (sipDisabled) {
      return Yabai.goToSpace(index)
    }
    Yabai.switchSpace(currentSpaceIndex, index)
  }

  const classes = ClassNames.build('spl-space', {
    'spl-space--focused': hasFocus,
    'spl-space--visible': isVisible,
    'spl-space--fullscreen': isNativeFullscreen,
    'spl-space--empty': !hasFocus && !isNativeFullscreen && (!firstWindow || !lastWindow)
  })

  return (
    <button className={classes} onClick={onClick}>
      <div className="spl-space__inner" />
      {label && !hasFocus && <span className="spl-space__label">{label}</span>}
    </button>
  )
}

export default Space
