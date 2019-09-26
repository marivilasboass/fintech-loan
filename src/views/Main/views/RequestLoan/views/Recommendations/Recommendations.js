import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { Text, Colors, Shadow, Spacing } from '~/newUI'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import Rates from '../../components/Rates'
import Summary from '~/components/Summary'
import { track } from '~/services/analytics'

const styles = StyleSheet.create({
  recommendationContainer: {
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    marginBottom: 20
  },

  defaultBorder: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.mercury
  },

  activeBorder: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.brightBlue
  },

  activeRecommendationContainer: {
    shadowColor: Colors.blueLightSafe,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 17
  },

  valueAndRates: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },

  summaryCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.s4,
    paddingHorizontal: 8
  }
})

export default class Recommendations extends React.PureComponent {
  state = {
    activeIndex: 0
  }

  componentDidMount () {
    this.selectActiveOption(1)
  }

  componentWillUnmount () {
    this.props.update({ optionsOfLoan: [] })
  }

  selectActiveOption = (index) => {
    const { update, optionsOfLoan } = this.props
    this.setState({ activeIndex: index })
    update({
      loan: optionsOfLoan[index]
    })
  }

  orderedOptions = options => options.sort((a, b) => a.numberOfInstallments > b.numberOfInstallments)

  onConfirm = () => {
    this.trackOption()
    this.props.navigation.navigate('ConfirmLoan')
  }

  trackOption = () => {
    const { activeIndex } = this.state
    const { optionsOfLoan } = this.props

    const option = optionsOfLoan[activeIndex]
    const { requestedAmountCents, numberOfInstallments, installmentAmountCents } = option
    track('RequestLoanSelectOption', { value: requestedAmountCents, requestedAmount: requestedAmountCents / 100, numberOfInstallments, installmentAmount: installmentAmountCents / 100 })
  }

  render () {
    const { activeIndex } = this.state
    const { navigation, optionsOfLoan } = this.props

    return (
      <ViewWithHeaderAndButton backgroundType='none' onPressBack={() => navigation.goBack(null)}>
        <ViewWithHeaderAndButton.Header>
          <Text.H3 align='center'>
            Escolha uma das nossas recomendações e peça seu empréstimo:
          </Text.H3>
        </ViewWithHeaderAndButton.Header>
        <ViewWithHeaderAndButton.Content>
          {this.orderedOptions(optionsOfLoan).map((option, index) => (
            <TouchableWithoutFeedback onPress={() => this.selectActiveOption(index)} key={option.numberOfInstallments}>
              <View>
                <Shadow
                  radius={10}
                  x={0}
                  y={0}
                  layout='fillWidth'
                  border={1}
                  outerStyle={[ styles.recommendationContainer, (index === activeIndex) && styles.activeRecommendationContainer ]}
                  innerStyle={[ styles.defaultBorder, (index === activeIndex) && styles.activeBorder ]}
                  color={index === activeIndex ? Colors.blueLightSafe : Colors.mercury}
                >
                  <Summary>
                    <Summary.Card style={styles.summaryCard}>
                      <Text.T3>Valor do empréstimo</Text.T3>
                      <View style={styles.valueAndRates}>
                        <Text.T3 variant='bold' format='currencyRounded'>{option.requestedAmountCents / 100}</Text.T3>
                        <Rates right>+ Taxas</Rates>
                      </View>
                    </Summary.Card>
                    <Summary.Card style={styles.summaryCard}>
                      <Text.T3>Total a pagar</Text.T3>
                      <Text>
                        <Text.H4 color={Colors.primary}>{option.numberOfInstallments}x</Text.H4>
                        <Text.T2> de </Text.T2>
                        <Text.H4 color={Colors.primary} format='currency'>{option.installmentAmountCents / 100}</Text.H4>
                      </Text>
                    </Summary.Card>
                  </Summary>
                </Shadow>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ViewWithHeaderAndButton.Content>
        <ViewWithHeaderAndButton.Button
          title='Confirmar'
          onPress={this.onConfirm}
        />
      </ViewWithHeaderAndButton>
    )
  }
}
