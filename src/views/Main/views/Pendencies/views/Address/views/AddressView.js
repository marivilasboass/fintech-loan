import React from 'react'
import { StyleSheet } from 'react-native'

import { Input, View, Switcher, Spacing, Message } from '~/newUI'
import { getAddressByCEP } from '~/services/getAddressByCEP'
import PendencyPage from '~/components/PendencyPage'

const styles = StyleSheet.create({
  message: {
    marginBottom: Spacing.s6
  },
  content: {
    justifyContent: 'flex-start'
  }
})

const clearCep = value => typeof value === 'string' ? value.replace('-', '') : ''
const getCleanCepSize = cep => cep ? clearCep(cep).length : 0
const validCleanCepSize = getCleanCepSize('99999-999')
const fullCepSize = '99999-999'.length

const initialAddress = {
  cep: null,
  street: null,
  houseNumber: null,
  complement: null,
  neighborhood: null,
  city: null,
  state: null,
  propertyType: 'own'
}

export default class AddressView extends React.Component {
  state = {
    searching: false,
    cepError: null,
    address: initialAddress
  }

  handleCepChange = async (value) => {
    if (getCleanCepSize(value) < validCleanCepSize) {
      this.setState(state => ({ address: { ...state.address, cep: value } }))
      return
    }

    const cep = clearCep(value)
    this.setState({ searching: true, address: { ...initialAddress, cep: value } })

    try {
      const address = await getAddressByCEP(cep)
      let allFieldsEnabled = false

      if (!address.street || !address.neighborhood || !address.city || !address.state) {
        allFieldsEnabled = true
      }

      this.setState(state => ({ searching: false, address: { ...state.address, ...address }, allFieldsEnabled, cepError: null }))
    } catch (err) {
      this.setState({ searching: false, cepError: 'CEP não encontrado' })
    }
  }

  handleChange = (field) => (value) => {
    this.setState(state => ({ address: { ...state.address, [field]: value } }))
  }

  handlePropertyTypeChange = ({ value }) => {
    this.setState(state => ({ address: { ...state.address, propertyType: value } }))
  }

  isValid = () => {
    const { address: { houseNumber, cep, street, neighborhood, city, state } } = this.state

    return (
      (cep && getCleanCepSize(cep) === validCleanCepSize) &&
      (houseNumber && houseNumber.length > 0) &&
      (street && street.length > 0) &&
      (neighborhood && neighborhood.length > 0) &&
      (city && city.length > 0) &&
      (state && state.length > 0)
    )
  }

  render () {
    const { onAddress, errorTitle, errorMessage, ...props } = this.props
    const { address, searching, cepError } = this.state

    return (
      <PendencyPage
        title='Onde você mora?'
        description='Digite abaixo o seu endereço'
        disabled={!this.isValid()}
        onNext={() => onAddress(address)}
        contentStyle={styles.content}
        {...props}
      >
        {errorTitle && errorMessage && (
          <Message style={styles.message} title={errorTitle} variant='error'>
            {errorMessage}
          </Message>
        )}
        <Input
          label='CEP'
          mask='zip-code'
          value={address.cep}
          onChange={this.handleCepChange}
          maxLength={fullCepSize}
          loading={searching}
          error={cepError}
          autoFocus
        />

        {getCleanCepSize(address.cep) === validCleanCepSize && !searching ? (
          <View>
            <Input label='Rua' value={address.street} onChange={this.handleChange('street')} />
            <Input label='Bairro' value={address.neighborhood} onChange={this.handleChange('neighborhood')} />
            <View style={{ flexDirection: 'row' }}>
              <Input label='Número' value={address.houseNumber} onChange={this.handleChange('houseNumber')} style={{ width: '60%' }} autoFocus={!cepError} />
              <Input label='Complemento' value={address.complement} onChange={this.handleChange('complement')} style={{ width: '38%', marginLeft: '2%' }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Input label='Cidade' value={address.city} onChange={this.handleChange('city')} style={{ width: '70%' }} />
              <Input label='Estado' value={address.state} onChange={this.handleChange('state')} style={{ width: '28%', marginLeft: '2%' }} />
            </View>

            <Switcher left={{ value: 'own', label: 'Próprio' }} right={{ value: 'rented', label: 'Alugado' }} value={address.propertyType} onChange={this.handlePropertyTypeChange} />
          </View>
        ) : null}

      </PendencyPage>
    )
  }
}
