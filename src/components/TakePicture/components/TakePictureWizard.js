import React from 'react'
import { View, StatusBar } from 'react-native'

import { Alert } from '~/newUI'

import TakePicture from '../TakePicture'
import CameraHeader from './CameraHeader'

export default class TakePictureWizard extends React.PureComponent {
  static defaultProps = {
    steps: [],
    current: 0
  }

  state = {
    pictures: {},
    confirmExit: false
  }

  handleCancel = () => {
    if (this.props.current === 1) {
      this.setState({ confirmExit: true })
    } else {
      this.props.onCancel()
    }
  }

  handleAlertCancel = () => {
    this.setState({ confirmExit: false })
  }

  handlePicture = (picture) => {
    const { nextStep, current } = this.props

    nextStep(current, picture)
  }

  render () {
    const { steps, current, overlayImage, onCancel, ...rest } = this.props
    const { confirmExit } = this.state

    const stepOverlayImage = steps[current] && steps[current].overlayImage

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        {confirmExit ? (
          <Alert isVisible>
            <Alert.Title>
              Tem certeza que deseja sair da câmera?
            </Alert.Title>
            <Alert.Description>
              A primeira foto que você tirou não ficará salva.
            </Alert.Description>
            <Alert.Button title='Cancelar' onPress={this.handleAlertCancel} />
            <Alert.Button title='Confirmar' onPress={onCancel} />
          </Alert>
        ) : null}
        <CameraHeader steps={steps} current={current} onClose={this.handleCancel} />
        <TakePicture
          {...rest}
          overlayImage={overlayImage || stepOverlayImage}
          onPicture={this.handlePicture}
          onCancel={this.handleCancel}
        />
      </View>
    )
  }
}
