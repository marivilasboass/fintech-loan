import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Colors } from '~/UI'
import * as progressImages from './images'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#e9e9e9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  text: {
    fontSize: 15,
    color: Colors.light
  },
  info: {
    fontFamily: 'open-sans-bold'
  }
})

export default class Progress extends React.PureComponent {
  render () {
    const { current, total } = this.props
    const image = progressImages[`step${current}of${total}`]
    const width = (total === 3 ? 119 : 165) * 0.7
    const height = 26 * 0.7

    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.info]}>{`ETAPA ${current}/${total}`}</Text>
        <Image style={{ width, height }} source={image} />
      </View>
    )
  }
}
