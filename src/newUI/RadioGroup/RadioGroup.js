import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Spacing from '../Spacing'
import View from '../View'
import Colors from '../Colors'
import Card from '../Card'
import Typography from '../Typography'
import Input from '../Input'

import RadioCircle from './components/RadioCircle'

const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    height: screenHeight / 13,
    alignItems: 'center',
    paddingLeft: Spacing.s3,
    justifyContent: 'space-between'
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftText: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center'
  },
  rightText: {
    flex: 0.7,
    textAlign: 'right',
    color: Colors.warmGray
  }
})

export default class RadioGroup extends React.PureComponent {
  static Others = Input

  static defaultProps = {
    items: [],
    value: null,
    onChange: () => { throw new Error('onChange not defined') }
  }

  render () {
    const { style, items, value, textStyle } = this.props
    return (
      <View style={style}>
        {items.map((item, i) => {
          return (
            <Card key={`${item}_${i}`} onPress={() => this.props.onChange(item)} outerStyle={{ marginVertical: 5 }}>
              <View style={[styles.innerContainer, item.secondaryLabel && { paddingRight: Spacing.s6 }]}>
                <View style={styles.leftContainer}>
                  <RadioCircle selected={value === item || value === item.value} />
                  <Typography.T2 style={[styles.leftText].concat(textStyle)}>{item.label}</Typography.T2>
                </View>
                { item.secondaryLabel &&
                <Typography.T2 style={[styles.rightText].concat(textStyle)}>{item.secondaryLabel}</Typography.T2>
                }
              </View>
            </Card>
          )
        })}
      </View>
    )
  }
}
