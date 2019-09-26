import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Typography, Spacing, Colors } from '~/newUI'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  col: {
    flex: 1,
    paddingHorizontal: Spacing.s2
  }
})

export default class TitleAndValueRow extends React.PureComponent {
  renderTitle = () => {
    const { text, component, props } = this.props.title
    const TextComponent = component || Typography.T2
    return <TextComponent style={styles.col} align='right' {...props}>{text}</TextComponent>
  }

  renderValue = () => {
    const { currency, value } = this.props
    const { text, component } = value
    const TextComponent = component || Typography.T2
    if (currency) {
      return (
        <TextComponent style={styles.col} align='left'>
          R$ <TextComponent variant='bold'>{text}</TextComponent>
        </TextComponent>
      )
    }
    return (
      <TextComponent style={styles.col} align='left'>{text}</TextComponent>
    )
  }

  renderValueWithPercetage = () => {
    const { yearPercentage, value } = this.props
    const { text, component } = value
    const TextComponent = component || Typography.T2
    return (
      <View style={styles.col}>
        <TextComponent>
          R$ <TextComponent variant='bold'>{text}</TextComponent>
        </TextComponent>
        <TextComponent color={Colors.warmGray}>({yearPercentage} a.a)</TextComponent>
      </View>
    )
  }

  render () {
    const { style, yearPercentage } = this.props
    return (
      <View style={[styles.row].concat(style)}>
        {this.renderTitle()}
        {yearPercentage ? this.renderValueWithPercetage() : this.renderValue()}
      </View>
    )
  }
}
