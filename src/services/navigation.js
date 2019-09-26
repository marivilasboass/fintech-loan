import { NavigationActions } from 'react-navigation'

const resetNavigationTo = (navigation, { routePath, params, prevRoutes = [] }) => {
  const prevActions = prevRoutes.map(
    prevRouteName => NavigationActions.navigate({ routeName: prevRouteName })
  )

  const navigationAction = recursivelyCreateNavigationActions({ routePath, params })

  const resetAction = NavigationActions.reset({
    key: null,
    index: prevRoutes.length,
    actions: [
      ...prevActions,
      navigationAction
    ]
  })

  navigation.dispatch(resetAction)
}

const navigate = (navigation, { routePath, params }) => {
  const navigationAction = recursivelyCreateNavigationActions({ routePath, params })

  navigation.dispatch(navigationAction)
}

const recursivelyCreateNavigationActions = ({ routePath, params }) => {
  if (routePath.length > 0) {
    const routeName = routePath[0]

    const lastRoute = routePath.length === 1

    const action = !lastRoute &&
      recursivelyCreateNavigationActions({ routePath: routePath.slice(1), params })

    return NavigationActions.navigate({
      routeName,
      params: lastRoute && params,
      action
    })
  }
}

export { resetNavigationTo, navigate }
