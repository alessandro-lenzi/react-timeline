import React from 'react'

import {
  DocsContainer as BaseContainer,
  DocsContainerProps,
} from '@storybook/addon-docs/blocks'
import { addons } from '@storybook/preview-api'
import { themes } from '@storybook/theming'
import {
  DARK_MODE_EVENT_NAME,
  // UPDATE_DARK_MODE_EVENT_NAME,
} from 'storybook-dark-mode'

const channel = addons.getChannel()

export default function DocsContainer(props: DocsContainerProps) {
  const [darkMode, setDarkMode] = React.useState(false)
  // const x = useDarkMode()
  // console.log(x)

  // const onChangeHandler = () => {
  //   channel.emit(UPDATE_DARK_MODE_EVENT_NAME)
  // }

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDarkMode)
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDarkMode)
  }, [setDarkMode])

  return (
    <BaseContainer {...props} theme={darkMode ? themes.dark : themes.light} />
  )
}
