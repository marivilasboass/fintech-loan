import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BottomSheet, Typography, Colors, View, Message, Spacing, Card, TitleAndValueRow } from '~/newUI'
import format from '~/services/format'

const styles = StyleSheet.create({
  content: {
    marginVertical: Spacing.s6
  },
  title: {
    marginBottom: Spacing.s1
  },
  subTitle: {
    marginBottom: Spacing.s6
  },
  card: {
    paddingVertical: Spacing.s3
  },
  cardRow: {
    marginVertical: Spacing.s1
  },
  divisor: {
    backgroundColor: Colors.dashed,
    height: 1,
    marginVertical: Spacing.s2
  }
})

export default class BottomSheetConfirmation extends React.PureComponent {
  handleConfirmation = () => {
    this.props.onPress()
    this.props.onConfirm()
  }

  renderValue = (props) => {
    const { loan, total } = this.props
    const { initialSimulation } = loan
    return (
      <Typography.T2 {...props}>
        <Typography.T1>{initialSimulation.numberOfInstallments}</Typography.T1>
        <Typography.T2>x de R$ </Typography.T2>
        <Typography.T1 format='newCurrency'>{total.totalToReceiveCents / initialSimulation.numberOfInstallments / 100}</Typography.T1>
      </Typography.T2>
    )
  }

  checkAvaliableLots = () => {
    this.handleConfirmation()
  }

  render () {
    const { active, onPress, total, loan, selectedLots, loading } = this.props
    const { totalToInvestCents, totalProfitCents } = total
    const { initialSimulation } = loan
    return (
      <BottomSheet active={active} onPress={onPress} >
        <ScrollView>
          <View style={styles.content} paddedHorizontally>
            <Typography.H5 style={styles.title} align='center' color={Colors.mutualBlue}>Resumo do investimento</Typography.H5>
            <Typography.T2 style={styles.subTitle} align='center'>Avalie os valores e condições para continuar</Typography.T2>
            <Card style={styles.card} outerStyle={{ marginBottom: Spacing.s8 }}>
              <TitleAndValueRow style={styles.cardRow} currency title={{ text: 'Investimento' }} value={{ text: format('newCurrency', totalToInvestCents / 100) }} />
              <TitleAndValueRow style={styles.cardRow} yearPercentage={format('percentage', initialSimulation.investorTotalProfitPercentage)} title={{ text: 'Lucro máximo' }} value={{ text: format('newCurrency', totalProfitCents / 100) }} />
              <TitleAndValueRow style={styles.cardRow} title={{ text: 'Recebendo em' }} value={{ component: this.renderValue }} />
              <View style={styles.divisor} />
              <Typography.T2 color={Colors.warmGray} align='center'>Cotas do investimento</Typography.T2>
              <TitleAndValueRow style={styles.cardRow} title={{ text: 'Qtd. desejada' }} value={{ text: `${selectedLots.length} ${selectedLots.length === 1 ? 'cota' : 'Cotas'}` }} />
            </Card>
            <Message variant='info'>
              <Typography.T3 align='center' color={Colors.nightRider}>
                Iremos bloquear o valor em sua carteira até a captação ser concluída. Caso a captação não atinja o valor total em até 3 dias, o valor investido será estornado para a sua carteira e este investimento cancelado automaticamente.
              </Typography.T3>
            </Message>
          </View>
        </ScrollView>
        <BottomSheet.Button small loading={loading} onPress={this.checkAvaliableLots} title='Continuar meu investimento' />
      </BottomSheet>
    )
  }
}
