import React from 'react'
import { connect } from 'react-redux'

import accountStatuses from '~/constants/accountStatuses'
import { accountOperations } from '~/store/account'
import { resetNavigationTo } from '~/services/navigation'
import { Loader } from '~/UI'

import Home from './Home'

class HomeContainer extends React.PureComponent {
  state = {
    loading: true
  }

  tryToLoginFromStorage = async () => {
    const { navigation, loginFromStorage, screenProps } = this.props
    const account = await loginFromStorage()

    if (!account) {
      this.setState({ loading: false })
      return
    }

    if (account.status === accountStatuses.noLimit || account.status === accountStatuses.fraud) {
      resetNavigationTo(navigation, { routePath: ['ProfileRejected'] })
      return
    }

    resetNavigationTo(screenProps.navigation, { routePath: ['Main'] })
  }

  componentDidMount () {
    this.tryToLoginFromStorage()
  }

  render () {
    const { loading } = this.state

    if (loading) {
      return (<Loader.FullScreen />)
    }

    return (<Home {...this.props} />)
  }
}

const mapDispatchToProps = {
  loginFromStorage: accountOperations.loginFromStorage
}

export default connect(null, mapDispatchToProps)(HomeContainer)
