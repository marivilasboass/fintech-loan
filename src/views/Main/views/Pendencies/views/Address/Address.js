import React from 'react'
import * as R from 'ramda'
import Sentry from 'sentry-expo'

import { TakePictureWizard } from '~/components/TakePicture'
import { track } from '~/services/analytics'

import AddressView from './views/AddressView'
import DocumentView from './views/DocumentView'
import AddressOwnerView from './views/AddressOwnerView'
import TermsView from './views/TermsView'
import UploadingAlert from '../../components/UploadingAlert'

export default class Address extends React.Component {
  static defaultProps = {
    onNext: () => { throw new Error('Address required an onNext prop') }
  }

  state = {
    loading: false,
    error: false,
    takingPicture: false,
    addressConfirmed: false,
    address: this.props.address || null,
    documentType: null,
    document: null,
    documentConfirmed: false,
    ownerType: null,
    ownershipConfirmed: false,
    termsConfirmed: false
  }

  onDocumentViewBack = () => {
    const { document } = this.state
    if (document) {
      track('AddressProofReviewBack')
      this.setState({ document: null })
      return
    }

    track('AddressProofInstructionsBack')
    this.setState({ addressConfirmed: false })
  }

  onProofPictureCanceled = () => {
    track('AddressProofTakePictureCancel')

    this.setState({ takingPicture: false })
  }

  onProofTypeSelected = ({ value }) => {
    track('AddressProofConfirm')

    this.setState({ documentType: value, takingPicture: true })
  }

  onProofPictureTaken = (document) => {
    this.setState({ takingPicture: false, document })
  }

  onCancel = () => {
    track('AddressCancel')

    this.props.navigation.goBack(null)
  }

  onConfirmAddress = (address) => {
    track('AddressConfirm')

    this.setState({ address, addressConfirmed: true })
  }

  onConfirmOwnership = () => {
    track('AddressOwnershipConfirm')

    if (this.state.ownerType === 'self') {
      this.onFinish()
      return
    }

    this.setState({ ownershipConfirmed: true })
  }

  onConfirmTerms = () => {
    track('AddressTermsConfirm')

    this.onFinish()
  }

  onFinish = async () => {
    const { ownerType, documentType, address, document } = this.state
    const { update, submitAddress, submitSingleDocument, navigation } = this.props

    this.setState({ loading: true, error: false })

    try {
      const { complement, ...restOfAddress } = address
      await submitAddress({ ...restOfAddress, ...(complement && { complement }) })
      await submitSingleDocument('addressProof', document, { ownerType, documentType })
      update({
        address,
        sentAddressAt: Date.now()
      })

      if (this.state.loading) {
        navigation.navigate('PendenciesStatus')
      }
    } catch (err) {
      if (this.state.loading) {
        this.setState({ loading: false, error: true })
        Sentry.captureException(err)
        return
      }
    }

    if (this.state.loading) {
      this.setState({ loading: false })
    }
  }

  onTakePicture = () => {
    track('AddressEditProof')

    this.setState({ takingPicture: true, document: null })
  }

  onOwnershipBack = () => {
    track('AddressTermsBack')

    this.setState({ ownershipConfirmed: false, ownerType: null, documentConfirmed: false })
  }

  onDocumentConfirmed = () => {
    track('AddressProofFinish')

    this.setState({ documentConfirmed: true })
  }

  render () {
    const { addressConfirmed, takingPicture, address, document, documentConfirmed, ownershipConfirmed, termsConfirmed, ownerType, loading, error } = this.state
    const { name, username, pendencies } = this.props

    const addressErrorTitle = R.path(['address', 'rejection', 'title'], pendencies)
    const addressErrorMessage = R.path(['address', 'rejection', 'message'], pendencies)
    const addressProofErrorTitle = R.path(['addressProof', 'rejection', 'title'], pendencies)
    const addressProofErrorMessage = R.path(['addressProof', 'rejection', 'message'], pendencies)

    if (takingPicture) {
      return (
        <TakePictureWizard
          overlayMessage='Posicione seu comprovante aqui'
          onCancel={this.onProofPictureCanceled}
          nextStep={(current, picture) => this.onProofPictureTaken(picture)}
        />
      )
    }

    if (!address || !addressConfirmed) {
      return (
        <AddressView
          onAddress={this.onConfirmAddress}
          onCancel={this.onCancel}
          onBack={this.onCancel}
          loading={loading}
          errorTitle={addressErrorTitle}
          errorMessage={addressErrorMessage}
        />
      )
    }

    if (!documentConfirmed) {
      return (
        <DocumentView
          onDocumentTypeSelected={this.onProofTypeSelected}
          onTakePicture={this.onTakePicture}
          onNext={this.onDocumentConfirmed}
          document={document}
          onCancel={this.onCancel}
          onBack={this.onDocumentViewBack}
          errorTitle={addressProofErrorTitle}
          errorMessage={addressProofErrorMessage}
        />
      )
    }

    if (!ownershipConfirmed) {
      return (
        <React.Fragment>
          <UploadingAlert
            isVisible={loading || error}
            error={error}
            onCancel={() => this.setState({ loading: false, error: false })}
            onRetry={this.onFinish}
          />

          <AddressOwnerView
            ownerType={ownerType}
            onChangeOwnership={ownerType => this.setState({ ownerType })}
            onNext={this.onConfirmOwnership}
            onBack={this.onOwnershipBack}
            onCancel={this.onCancel}
            disabled={loading}
          />
        </React.Fragment>
      )
    }

    if (!termsConfirmed) {
      return (
        <React.Fragment>
          <UploadingAlert
            isVisible={loading || error}
            error={error}
            onCancel={() => this.setState({ loading: false, error: false })}
            onRetry={this.onFinish}
          />

          <TermsView
            name={name}
            cpf={username}
            address={address}
            onNext={this.onConfirmTerms}
            onCancel={this.onCancel}
            onBack={this.onOwnershipBack}
            disabled={loading}
          />
        </React.Fragment>
      )
    }

    throw new Error('Invalid AddressPendency render')
  }
}
