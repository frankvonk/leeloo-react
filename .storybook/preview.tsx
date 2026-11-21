import type { Preview } from '@storybook/nextjs-vite'
import '../app/styles/themes.css'

// Same theme names as the vanilla app: body class "body__<theme>".
const themes = [
  'wireframe',
  'black',
  'kowloon',
  'sun-gym',
  'love-story',
  'the-white-lotus',
  'the-neon-demon',
  'irina-rimes',
]

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themes,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'wireframe',
  },
  decorators: [
    (Story, context) => {
      // wireframe styles plain <body>, the others need their class.
      const theme = context.globals.theme
      document.body.className = theme === 'wireframe' ? '' : `body__${theme}`
      return <Story />
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
