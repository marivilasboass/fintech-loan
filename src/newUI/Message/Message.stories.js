import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { View, Text } from '~/newUI'

import Message from './Message'

const styles = StyleSheet.create({
  message: {
    marginBottom: 20
  }
})

storiesOf('Message', module)
  .addDecorator(getStory => (
    <ScrollView>
      <View paddedHorizontally>{getStory()}</View>
    </ScrollView>
  ))
  .add('default', () => (
    <Message>Message padrão</Message>
  ))
  .add('variants', () => (
    <View>
      <Message style={styles.message} title='Endereço' variant='error'>
        O documento que você nos enviou, não está respeitando o prazo de validade estipulado (3 meses).
      </Message>
      <Message style={styles.message} title='Seu comprovante foi aceito' variant='success'>O comprovante que você nos enviou foi aceito pela nossa equipe.</Message>
      <Message style={styles.message} title='Empréstimo em análise' variant='warning'>O comprovante que você nos enviou foi aceito pela nossa equipe.</Message>
      <Message style={styles.message} variant='info'>Ainda não aceitamos comprovantes em nome de cônjuge.</Message>
      <Message style={styles.message} variant='info'>
        Sua parcela venceu em <Text variant='bold'>15/07/18</Text> e o valor em aberto é de <Text variant='bold'>R$ 590,97</Text>.
      </Message>
    </View>
  ))
