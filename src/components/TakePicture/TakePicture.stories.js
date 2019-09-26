import React from 'react'
import { Image } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import { View } from '~/newUI'

import TakePicture from './TakePicture'
import ShutterButton from './components/ShutterButton'
import CameraHeader from './components/CameraHeader'
import TakePictureWizard from './components/TakePictureWizard'
import Overlay from './components/Overlay'

const action = console.log // eslint-disable-line no-console

class OverlayResult extends React.Component {
  state = { picture: null }

  handlePicture = (picture) => {
    this.setState({ picture })
  }

  render () {
    if (this.state.picture) {
      return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={this.state.picture} style={{ width: '75%' }} />
        </View>
      )
    }

    return (
      <TakePicture
        onCancel={action('onCancel')}
        onPicture={this.handlePicture} />
    )
  }
}

storiesOf('TakePicture', module)
  .add('basic', () => (
    <TakePicture onCancel={action('onCancel')} onPicture={action('OnPicture')} />
  ))
  .add('shutter button', () => (
    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <ShutterButton />
    </View>
  ))
  .add('basic camera header', () => (
    <CameraHeader onClose={action('onClose')} />
  ))
  .add('stepped camera header', () => (
    <CameraHeader steps={[{ label: 'Frente', value: 'front' }, { label: 'Verso', value: 'back' }]} onClose={action('onClose')} />
  ))
  .add('stepped progress camera header', () => (
    <CameraHeader current={1} steps={[{ label: 'Frente', value: 'front' }, { label: 'Verso', value: 'back' }]} onClose={action('onClose')} />
  ))
  .add('crop target selfie', () => (
    <TakePicture useBackCamera={false} overlayMessage='Posicione seu rosto' onCancel={action('onCancel')} onPicture={action('OnPicture')} />
  ))
  .add('crop target doc', () => (
    <TakePicture overlayMessage='Posicione a frente do seu documento' onCancel={action('onCancel')} onPicture={action('OnPicture')} />
  ))
  .add('crop target endereco', () => (
    <TakePicture overlayMessage='Posicione seu comprovante' onCancel={action('onCancel')} onPicture={action('OnPicture')} />
  ))
  .add('crop target message', () => (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
      <Overlay message='Posicione seu rosto aqui' />
    </View>
  ))
  .add('crop result', () => (
    <OverlayResult crop='square' />
  ))
  .add('wizard', () => (
    <TakePictureWizard
      onPictures={action('onPictures')}
      steps={[{ label: 'Frente', value: 'front' }, { label: 'Verso', value: 'back' }]}
      onCancel={action('onClose')} />
  ))
