import React from 'react'

import { storiesOf } from '@storybook/react-native'

import Address from './Address'
import AddressView from './views/AddressView'
import Document from './views/DocumentView'

const document = require('./stories/document.jpg')
const action = console.log // eslint-disable-line no-console

const mockAddress = {
  cep: '22059050',
  street: 'Rua do Chaves',
  number: '51',
  complement: '',
  neighborhood: 'China',
  city: 'Rio de Janeiro',
  state: 'RJ',
  propertyType: 'rented'
}

storiesOf('Views - Endereço', module)
  .add('fluxo inicial', () => (
    <Address onNext={action('onNext')} onCancel={action('onCancel')} />
  ))
  .add('fluxo com address', () => (
    <Address address={mockAddress} onNext={action('onNext')} onCancel={action('onCancel')} />
  ))
  .add('address empty', () => (
    <AddressView onAddress={action('onAddress')} onCancel={action('onCancel')} />
  ))
  .add('address filled', () => (
    <AddressView address={mockAddress} onAddress={action('onAddress')} onCancel={action('onCancel')} />
  ))
  .add('documents empty', () => (
    <Document onDocumentTypeSelected={action('onDocumentTypeSelected')} onCancel={action('onCancel')} />
  ))
  .add('documents filled', () => (
    <Document document={document} onDocumentTypeSelected={action('onDocumentTypeSelected')} onCancel={action('onCancel')} />
  ))
