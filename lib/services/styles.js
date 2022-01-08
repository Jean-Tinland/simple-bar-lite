import * as Settings from './settings'

export const inject = (id, styles = []) => {
  const existingStyles = document.getElementById(id)
  const stylesToInject = styles.join('')
  if (existingStyles) return (existingStyles.innerHTML = stylesToInject)
  document.head.appendChild(
    Object.assign(document.createElement('style'), {
      id,
      innerHTML: stylesToInject
    })
  )
}

export const load = (url, id) => {
  const link = document.getElementById(id)
  return new Promise((resolve) => {
    const el = Object.assign(document.createElement('link'), {
      id,
      href: url,
      type: 'text/css',
      rel: 'stylesheet',
      onload: resolve
    })
    if (link) link.remove()
    document.head.appendChild(el)
  })
}

const settings = Settings.get()
const { theme, themeScheme } = settings

const themedVariables = (scheme) => /* css */ `
:root {
  --spl-main: ${theme[scheme].main};
  --spl-main-alt: ${theme[scheme].mainAlt};
  --spl-minor: ${theme[scheme].minor};
  --spl-accent: ${theme[scheme].yellow};
  --spl-red: ${theme[scheme].red};
  --spl-green: ${theme[scheme].green};
  --spl-yellow: ${theme[scheme].yellow};
  --spl-orange: ${theme[scheme].orange};
  --spl-blue: ${theme[scheme].blue};
  --spl-magenta: ${theme[scheme].magenta};
  --spl-cyan: ${theme[scheme].cyan};
  --spl-black: ${theme.black};
  --spl-white: ${theme.white};
  --spl-foreground: ${theme[scheme].foreground};
  --spl-background: ${theme[scheme].main};
  --spl-gradient: ${theme[scheme].gradient};
  --spl-font-family: ${theme.fontFamily};
  --spl-font-size: ${theme.fontSize};
  --spl-bar-width: ${theme.barWidth};
  --spl-bar-height: ${theme.barHeight};
  --spl-bar-vertical-offset: ${theme.barVerticalOffset};
  --spl-bar-horizontal-offset: ${theme.barHorizontalOffset};
  --spl-bar-inner-margin: ${theme.barInnerMargin};
  --spl-bar-radius: ${theme.barRadius};
  --spl-bar-opacity: ${theme.barOpacity};
  --spl-space-margin: ${theme.spaceMargin};
  --spl-process-width: ${theme.processWidth};
  --spl-item-radius: ${theme.itemRadius};
  --spl-item-margin: ${theme.itemMargin};
  --spl-item-inner-margin: ${theme.itemInnerMargin};
  --spl-shadow: ${theme.shadow};
  --spl-transition-easing: ${theme.transitionEasing};
}
`

const darkVariables = themedVariables('dark')
const lightVariables = themedVariables('light')

const buildVariables = () => {
  if (themeScheme === 'auto') {
    return /* css */ `
      @media (prefers-color-scheme: light) {
        ${lightVariables}
      }
      @media (prefers-color-scheme: dark) {
        ${darkVariables}
      }
    `
  }
  if (themeScheme === 'light') return lightVariables
  return darkVariables
}

export const variables = buildVariables()
