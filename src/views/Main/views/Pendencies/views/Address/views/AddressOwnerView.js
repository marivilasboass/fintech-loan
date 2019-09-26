import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, RadioGroup, Message } from '~/newUI'

import PendencyPage from '~/components/PendencyPage'

const styles = StyleSheet.create({
  message: { marginTop: 16 }
})

export default class AddressOwnerView extends React.Component {
  static defaultProps = {
    onNext: () => { throw new Error('AddressOwnerView expects a prop onNext') },
    onChangeOwnership: () => { throw new Error('AddressOwnerView expects a prop onChangeOwnership') }
  }

  render () {
    const { disabled, onNext, onChangeOwnership, ownerType, ...props } = this.props

    return (
      <PendencyPage
        title='Esse comprovante de residência está no nome de quem?'
        disabled={disabled || !ownerType}
        onNext={() => onNext()}
        {...props}
      >
        <RadioGroup
          items={[{ value: 'self', label: 'Meu nome' }, { value: 'mother', label: 'Minha mãe' }, { value: 'father', label: 'Meu pai' }]}
          value={ownerType}
          onChange={item => onChangeOwnership(item.value)} />
        <Message variant='info' style={styles.message}>
          <Text.T4 variant='semibold'>
            Ainda não aceitamos comprovantes em nome de cônjuge.
          </Text.T4>
        </Message>
      </PendencyPage>
    )
  }
}
