import React from 'react'

import { storiesOf } from '@storybook/react-native'

import IdentificationView from './Identification'
import SelfieView from './views/SelfieView'
import DocumentsView from './views/DocumentsView'

const document = require('./stories/document.jpg')
const action = console.log // eslint-disable-line no-console

storiesOf('Views - Identificação', module)
  .add('inicio', () => (
    <IdentificationView onNext={action('onNext')} onCancel={action('onCancel')} />
  ))
  .add('selfie empty', () => (
    <SelfieView onTakePicture={action('onTakePicture')} onCancel={action('onCancel')} />
  ))
  .add('selfie filled', () => (
    <SelfieView selfie={require('./stories/selfie.jpg')} onNext={action('onSelfieNext')} onCancel={action('onCancel')} />
  ))
  .add('documents empty', () => (
    <DocumentsView onDocumentTypeSelected={action('onDocumentTypeSelected')} onCancel={action('onCancel')} />
  ))
  .add('documents filled', () => (
    <DocumentsView front={document} back={document} onDocumentTypeSelected={action('onDocumentTypeSelected')} onCancel={action('onCancel')} />
  ))
