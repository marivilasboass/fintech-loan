import React from 'react'
import LoadingAlert from './components/LoadingAlert'
import HasActiveLoanAlert from './components/HasActiveLoanAlert'
import RecommendationsAlert from './components/RecommendationsAlert'
import RefusedAlert from './components/RefusedAlert'
import ErrorAlert from './components/ErrorAlert'

export default class AlertManager extends React.PureComponent {
  state = {
    loadingHidden: true
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.alertState !== 'loading' && this.props.alertState === 'loading') {
      this.setState({ loadingHidden: false })
    }
  }

  onAcceptActiveLoan = () => {
    this.props.onClose()
    this.props.parentNavigation.navigate('MyLoans')
  }

  onAcceptRecommendations = () => {
    this.props.onClose()
    this.props.navigation.navigate('Recommendations')
  }

  render () {
    const { alertState, onClose } = this.props
    const { loadingHidden } = this.state

    return (
      <React.Fragment>
        <LoadingAlert
          isVisible={alertState === 'loading'}
          onModalHide={() => this.setState({ loadingHidden: true })}
        />

        <HasActiveLoanAlert
          isVisible={alertState === 'hasActiveLoan'}
          onRequestClose={onClose}
          onAccept={this.onAcceptActiveLoan}
        />

        <RecommendationsAlert
          isVisible={loadingHidden && alertState === 'hasRecommendations'}
          onRequestClose={onClose}
          onAccept={this.onAcceptRecommendations}
        />

        <RefusedAlert
          isVisible={loadingHidden && alertState === 'refused'}
          onRequestClose={onClose}
        />

        <ErrorAlert
          isVisible={loadingHidden && alertState === 'error'}
          onRequestClose={onClose}
          onAccept={onClose}
        />
      </React.Fragment>
    )
  }
}
