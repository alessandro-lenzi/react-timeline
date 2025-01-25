import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

import DocsContainer from './DocsContainer'

import '../src/App.css'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    // viewMode: 'docs',
    docs: {
      container: DocsContainer,
    },
    darkMode: {
      current: 'light',
      dark: { ...themes.dark },
      light: { ...themes.light },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'dataAttributeForTheme',
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
}

export default preview
