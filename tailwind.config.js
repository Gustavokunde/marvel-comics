const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-green': 'rgb(19, 51, 44)',
        'light-green': 'rgb(29, 184, 114)',
        'light-gray': '#ebeffa',
      },
    },
  },
  plugins: [],
};
