import React from 'react'
import Sentry from 'sentry-expo'

import { track } from '~/services/analytics'
import MaritalStatus from './Views/MaritalStatus'
import GenderSelector from './Views/GenderSelector'

const initialState = {
  civilState: '',
  maritalStatus: '',
  spouseName: '',
  maritalDone: false,
  gender: ''
}

export default class PersonalView extends React.PureComponent {
    state = initialState

    handleCivilState = ({ value }) => {
      this.setState({ civilState: value, maritalStatus: '' })
    }

    handleMaritalStatus = ({ value }) => {
      this.setState({ maritalStatus: value })
    }

    handleSpouseName = (value) => {
      this.setState({ spouseName: value })
    }

    handleGender = ({ value: gender }) => {
      this.setState({ gender })
    }

    handleMaritalDone = () => {
      this.setState({ maritalDone: true })
    }

    onBackToMarital = () => {
      this.setState(initialState)
    }

    onBackToGender = () => {
      this.setState({ genderDone: false })
    }

    handleNext = async () => {
      track('PersonalConfirm')

      const { civilState, maritalStatus, spouseName, gender } = this.state
      const { submitPersonalInformation, navigation } = this.props
      try {
        this.setState({ loading: true })

        const maritalStatusToSend = civilState !== 'married'
          ? civilState
          : maritalStatus
        await submitPersonalInformation(maritalStatusToSend, spouseName, gender)
        navigation.navigate('PendenciesStatus')
      } catch (err) {
        // TODO: decide how to handle errors
        Sentry.captureException(err)
      }
      this.setState({ loading: false })
    }

    onCancel = () => {
      track('PersonalCancel')

      this.props.navigation.goBack(null)
    }

    render () {
      const { civilState, maritalStatus, spouseName, loading, maritalDone, gender } = this.state

      if (!maritalDone) {
        return (
          <MaritalStatus
            civilState={civilState}
            maritalStatus={maritalStatus}
            spouseName={spouseName}
            onCancel={this.onCancel}
            onNext={this.handleMaritalDone}
            handleCivilState={this.handleCivilState}
            handleMaritalStatus={this.handleMaritalStatus}
            handleSpouseName={this.handleSpouseName}
          />
        )
      }
      if (maritalDone) {
        return (
          <GenderSelector
            gender={gender}
            loading={loading}
            onCancel={this.onCancel}
            onNext={this.handleNext}
            onBack={this.onBackToMarital}
            handleGender={this.handleGender}
          />
        )
      }
    }
}
