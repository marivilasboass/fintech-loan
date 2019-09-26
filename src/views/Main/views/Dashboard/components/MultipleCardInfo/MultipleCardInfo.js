import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from '~/newUI'
import CardInfo from '../CardInfo'

const styles = StyleSheet.create({
  cardInfoStyle: {
    flex: 1
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default class MultipleCardInfo extends PureComponent {
  render () {
    const { info, borderless, innerStyle, outerStyle } = this.props
    return (
      <Card outerStyle={outerStyle} style={[styles.card].concat(innerStyle)} borderless={borderless}>
        {info.map((info, index) => {
          const { title, value, description, valueDescription, info: infoIcon, onPressInfo } = info
          return (
            <CardInfo
              key={index}
              title={title}
              value={value}
              description={description}
              valueDescription={valueDescription}
              style={styles.cardInfoStyle}
              info={infoIcon}
              onPressInfo={onPressInfo}
            />
          )
        })}
      </Card>
    )
  }
}
