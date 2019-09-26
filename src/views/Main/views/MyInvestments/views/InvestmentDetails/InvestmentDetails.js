import React from 'react'
import { StyleSheet } from 'react-native'
import * as R from 'ramda'

import { FixedHeader, View, Colors, Typography } from '~/newUI'
import DetailsNavigation from './views'
import { InstallmentBottomSheet } from './components'

const styles = StyleSheet.create({
  score: {
    width: 28,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: 20
  }
})

export default class InvestmentDetails extends React.PureComponent {
  componentDidMount () {
    const { investment } = this.props.navigation.state.params
    const { activeNegotiationId } = investment
    if (activeNegotiationId) {
      this.fetchInstallments(activeNegotiationId)
    }
  }

  componentWillUnmount () {
    this.props.clearInvestment()
    this.props.clearInstallments()
  }

  fetchInstallments = async (id) => {
    if (!this.props.loading) {
      await this.props.fetchInstallments(id)
    }
  }

  render () {
    const { navigation, installments, selectedInstallment, clearInstallment } = this.props
    const { investment } = navigation.state.params
    const installmentIndex = installments.findIndex(({ _id }) => _id === selectedInstallment._id)
    const { score, scoreFull } = investment

    return (
      <React.Fragment>
        <FixedHeader
          rightComponent={(
            <View style={[styles.score].concat({ backgroundColor: Colors[`score${score}`] })}>
              <Typography.T4 color={Colors.white}>{scoreFull}</Typography.T4>
            </View>
          )}
          centerTitle={'Meu Investimento'}
          navigation={navigation}
        />
        <DetailsNavigation {...this.props} />
        <InstallmentBottomSheet active={!R.isEmpty(selectedInstallment)} installment={selectedInstallment} totalInstallments={installments.length} installmentIndex={installmentIndex} onPress={clearInstallment} />
      </React.Fragment>
    )
  }
}
