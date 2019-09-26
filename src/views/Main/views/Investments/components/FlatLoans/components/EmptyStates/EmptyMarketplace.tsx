import React from 'react'
import { StyleSheet } from 'react-native'
import { Spacing, Typography, Message } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.s6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s7,
    paddingVertical: Spacing.s2
  }
})

export default class EmptyMarketplace extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Message variant='info' style={styles.container}><Typography.T3 align={'center'}>Todos os pedidos já foram investidos. Estamos trazendo novos tomadores, aguarde e volte daqui a pouco.</Typography.T3></Message>
      </React.Fragment>
    )
  }
}

