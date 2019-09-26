import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Spacing, Card } from '~/newUI'
import { CardInfo } from '../../components'

const styles = StyleSheet.create({
  infoCardContainer: {
    flexDirection: 'row',
    marginTop: Spacing.s5
  },
  investimentCard: {
    flex: 1,
    marginRight: Spacing.s5
  },
  pendenciesCard: {
    flex: 1
  }
})

export default class InfoChartArea extends React.PureComponent {
  render () {
    const { info } = this.props
    const { investiments, pending } = info
    return (
      <View style={styles.infoCardContainer}>

        {/* investiments card */}
        <Card outerStyle={styles.investimentCard}>
          <CardInfo
            title={'Investido'}
            value={`R$ ${investiments.value}`}
            description={`${investiments.amount} empréstimos`}
          />
        </Card>

        {/* pendencies card */}
        <Card outerStyle={styles.pendenciesCard}>
          <CardInfo
            title={'Em análise'}
            value={`R$ ${pending.value}`}
            description={`${pending.amount} empréstimos`}
          />
        </Card>

      </View>
    )
  }
}
