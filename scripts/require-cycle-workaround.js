// https://github.com/facebook/metro/issues/287#issuecomment-441045605
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Invalid storybook selection'
])

if (__DEV__) {
  const IGNORED_WARNINGS = [
    'Require cycle:'
  ]
  const oldConsoleWarn = console.warn

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      IGNORED_WARNINGS.some(ignoredWarning =>
        args[0].startsWith(ignoredWarning)
      )
    ) {
      return
    }

    return oldConsoleWarn.apply(console, args)
  }
}
