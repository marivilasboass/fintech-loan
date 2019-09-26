import React, { Component } from 'react'
import * as R from 'ramda'
import Sentry from 'sentry-expo'

import { TakePictureWizard } from '~/components/TakePicture'
import { track } from '~/services/analytics'

import SelfieView from './views/SelfieView'
import DocumentsView from './views/DocumentsView'
import CNHFrontImage from './components/CNHFrontImage'
import CNHBackImage from './components/CNHBackImage'
import RGFrontImage from './components/RGFrontImage'
import RGBackImage from './components/RGBackImage'
import SelfieImage from './components/SelfieImage'
import UploadingAlert from '../../components/UploadingAlert'

export default class IndentificationView extends Component {
  state = {
    loading: false,
    error: false,
    takePicture: null,
    selfie: null,
    selfieConfirmed: false,
    documentType: null,
    documentFront: null,
    documentBack: null,
    documentCurrentStep: 0
  }

  selfieIsSolved = () => {
    const { pendencies } = this.props
    const selfieIsSolved = R.path(['selfie', 'status'], pendencies) === 'solved'

    return selfieIsSolved
  }

  documentsIsSolved = () => {
    const { pendencies } = this.props
    const selfieIsSolved = R.path(['idDocuments', 'front', 'status'], pendencies) === 'solved'

    return selfieIsSolved
  }

  onSelfieViewBack = () => {
    const { selfie } = this.state
    if (selfie) {
      track('SelfieReviewBack')
      this.setState({ selfie: null })
      return
    }

    track('SelfieCancel')
    this.props.navigation.goBack(null)
  }

  onDocumentsViewBack = () => {
    const { documentFront, documentBack } = this.state
    if (documentFront || documentBack) {
      track('DocumentsReviewBack')
      this.setState({ documentFront: null, documentBack: null })
      return
    }

    track('DocumentsCancel')
    if (!this.selfieIsSolved()) {
      this.setState({ selfieConfirmed: false })
      return
    }

    this.props.navigation.goBack(null)
  }

  handleCancelPicture = () => {
    track('IdentificationTakePictureCancel')

    this.setState({ takePicture: null, documentCurrentStep: 0 })
  }

  handleSelfie = (picture) => {
    this.setState({ takePicture: null, selfie: picture, selfieConfirmed: false })
  }

  handleDocumentNextStep = async (documentCurrentStep, picture) => {
    if (documentCurrentStep === 0) {
      this.setState(state => ({
        documentFront: picture,
        documentCurrentStep: state.documentBack ? 0 : documentCurrentStep + 1,
        takePicture: state.documentBack ? null : state.takePicture
      }))
      return
    }

    if (documentCurrentStep === 1) {
      this.setState({
        documentBack: picture,
        takePicture: null,
        documentCurrentStep: 0
      })
    }
  }

  onCancel = () => {
    track('IdentificationCancel')

    this.props.navigation.goBack(null)
  }

  onSelfieFinished = async () => {
    track('SelfieFinish')
    if (this.documentsIsSolved()) {
      this.handleFinished()
      return
    }

    this.setState({ selfieConfirmed: true })
  }

  handleDocumentsFinished = async () => {
    track('DocumentsFinish')
    this.handleFinished()
  }

  handleFinished = async () => {
    this.setState({ loading: true, error: false })
    try {
      await Promise.all([
        this.uploadSelfie(),
        this.uploadDocuments()
      ])

      // workaround because of delay between S3 -> account service
      this.props.update({ sentIdDocumentAt: Date.now() })

      // if it hasn't been cancelled
      if (this.state.loading) {
        this.props.navigation.navigate('PendenciesStatus')
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

  uploadSelfie = async () => {
    const { selfie } = this.state
    if (!selfie) {
      return
    }

    await this.props.submitSingleDocument('selfie', selfie)
    this.props.update({
      smallProfilePicture: selfie.uri,
      largeProfilePicture: selfie.uri
    })
  }

  uploadDocuments = async () => {
    const { documentType, documentFront, documentBack } = this.state
    if (!documentBack || !documentFront) {
      return
    }

    await this.props.submitDoubleDocument(documentType, documentFront, documentBack)
  }

  onSelfieTakePicture = () => {
    if (this.state.selfie) {
      track('SelfieEdit')
    } else {
      track('SelfieConfirm')
    }

    this.setState({ takePicture: 'selfie' })
  }

  onDocumentsEdit = (documentCurrentStep) => {
    track('DocumentsEdit')

    this.setState({ takePicture: 'document', documentCurrentStep })
  }

  onDocumentTypeSelected = ({ value }) => {
    track('DocumentsConfirm')

    this.setState({ documentType: value, documentFront: null, documentBack: null, takePicture: 'document' })
  }

  render () {
    const { takePicture, selfie, selfieConfirmed, documentType, documentFront,
      documentBack, documentCurrentStep, loading, error } = this.state
    const { pendencies } = this.props

    const selfieErrorTitle = R.path(['selfie', 'rejection', 'title'], pendencies)
    const selfieErrorMessage = R.path(['selfie', 'rejection', 'message'], pendencies)

    const documentErrorTitle = R.path(['idDocuments', 'front', 'rejection', 'title'], pendencies)
    const documentErrorMessage = R.path(['idDocuments', 'front', 'rejection', 'message'], pendencies)

    if (takePicture === 'selfie') {
      return (
        <TakePictureWizard
          overlayImage={(<SelfieImage />)}
          useBackCamera={false}
          onCancel={this.handleCancelPicture}
          nextStep={(current, picture) => this.handleSelfie(picture)}
        />
      )
    }

    if (takePicture === 'document') {
      const frontImage = documentType === 'rg' ? (<RGFrontImage />) : (<CNHFrontImage />)
      const backImage = documentType === 'rg' ? (<RGBackImage />) : (<CNHBackImage />)

      return (
        <TakePictureWizard
          onCancel={this.handleCancelPicture}
          steps={[
            { label: 'Frente', value: 'front', overlayImage: frontImage },
            { label: 'Verso', value: 'back', overlayImage: backImage }
          ]}
          current={documentCurrentStep}
          nextStep={this.handleDocumentNextStep}
        />
      )
    }

    if (!selfieConfirmed && !this.selfieIsSolved()) {
      return (
        <React.Fragment>
          <UploadingAlert
            isVisible={loading || error}
            error={error}
            onCancel={() => this.setState({ loading: false, error: false })}
            onRetry={this.handleFinished}
          />
          <SelfieView
            errorTitle={selfieErrorTitle}
            errorMessage={selfieErrorMessage}
            onTakePicture={this.onSelfieTakePicture}
            selfie={selfie}
            onCancel={this.onCancel}
            onBack={this.onSelfieViewBack}
            onNext={this.onSelfieFinished}
            disabled={loading}
          />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <UploadingAlert
          isVisible={loading || error}
          error={error}
          onCancel={() => this.setState({ loading: false, error: false })}
          onRetry={this.handleFinished}
        />

        <DocumentsView
          errorTitle={documentErrorTitle}
          errorMessage={documentErrorMessage}
          onTakePicture={this.onDocumentsEdit}
          front={documentFront}
          back={documentBack}
          onDocumentTypeSelected={this.onDocumentTypeSelected}
          onCancel={this.onCancel}
          onBack={this.onDocumentsViewBack}
          onNext={this.handleDocumentsFinished}
          disabled={loading}
        />
      </React.Fragment>
    )
  }
}
