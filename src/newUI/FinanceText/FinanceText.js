import React from 'react'
import Text from '../Text'
import Colors from '../Colors'

import formatText from '~/services/format'
import ActivityIndicator from '../ActivityIndicator'
import View from '../View'
import { StyleSheet } from 'react-native'
import Spacing from '../Spacing'

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: Spacing.s2
  }
})

export default class FinanceText extends React.PureComponent {
  render () {
    const {
      children, format, currencyProps, cashProps, centsProps, withOperator, type, color, loading, ...props
    } = this.props

    const formattedValue = formatText('currency', children)
    const currency = formattedValue.slice(0, 2)
    const cash = formattedValue.split(/R\$|,/)

    const operator = (type) && type === 'INCREASE' ? '+ ' : '- '
    const operatorColor = (type) && type === 'INCREASE' ? Colors.green : Colors.cinnabar

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={16} color={Colors.white} />
        </View>
      )
    }

    return (
      <Text {...props}>
        { withOperator && <Text color={operatorColor} {...withOperator}>{operator}</Text> }
        <Text {...currencyProps} color={color || currencyProps.color || operatorColor}>{currency}&nbsp;</Text>
        <Text {...cashProps} color={color || cashProps.color || operatorColor}>{cash[1]}</Text>
        <Text {...centsProps || { ...cashProps }} color={color || centsProps.color || operatorColor}>,{cash[2]}</Text>
      </Text>
    )
  }
}
