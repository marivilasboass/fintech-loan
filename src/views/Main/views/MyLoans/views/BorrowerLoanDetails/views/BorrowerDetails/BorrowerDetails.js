import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { Colors, Button, ScrollView } from '~/UI'
import LoanStatusBanner from '~/components/LoanStatusBanner'
import LoanOwnersHeader from '~/components/LoanOwnersHeader'
import LoanDetails from './components/LoanDetails'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  innerContainer: {
    padding: 15
  },
  button: {
    marginTop: 20
  },
  scrollViewContainer: {
    flexGrow: 1
  }
})

export default class BorrowerDetails extends React.PureComponent {
  state = {
    loading: false
  }

  cancelLoan = async () => {
    const { screenProps, cancel, changeFlagStatus } = this.props
    const { loan } = screenProps.navigation.state.params

    this.setState({ loading: true })

    await cancel(loan._id)

    changeFlagStatus('hasActiveLoan', false)
    screenProps.navigation.goBack()
  }

  onCancel = async () => {
    Alert.alert('Cancelar', 'Deseja realmente cancelar este pedido de empréstimo?', [
      { text: 'Sim', onPress: this.cancelLoan },
      { text: 'Não' }
    ])
  }

  render () {
    const { loan } = this.props.screenProps.navigation.state.params
    const { borrower, marketplaceStatus } = loan
    const { loading } = this.state

    const isInvested = marketplaceStatus === 'invested'
    const canCancel = marketplaceStatus === 'pending' || marketplaceStatus === 'published'

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <LoanStatusBanner {...loan} />
          <View style={styles.innerContainer}>
            <LoanOwnersHeader borrower={borrower} marketplaceStatus={loan.marketplaceStatus} />

            <LoanDetails loan={loan} />

            {!isInvested ? (
              <Button
                style={styles.button}
                large
                loading={loading}
                disabled={loading || !canCancel}
                title='Cancelar pedido'
                onPress={this.onCancel}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    )
  }
}
