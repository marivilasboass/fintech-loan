const navigateBack = navigation => {
  const previousRoute = navigation.getParam('previousRoute')
  if (previousRoute) {
    return navigation.navigate(previousRoute)
  }
  return navigation.goBack(null)
}

export default navigateBack
