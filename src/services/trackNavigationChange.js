import { trackScreen } from '~/services/analytics'
import getCurrentRouteName from '~/services/getCurrentRouteName'

const trackNavigationChange = (prevState, currentState) => {
  // gets the current screen from navigation state

  const currentScreen = getCurrentRouteName(currentState)
  const prevScreen = getCurrentRouteName(prevState)

  if (prevScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    trackScreen(currentScreen, {
      prevScreen
    })
  }

  return { prevScreen, currentScreen }
}

export { trackNavigationChange }
