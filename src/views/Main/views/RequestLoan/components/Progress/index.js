import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Colors } from '~/UI'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  textContainer: {
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'open-sans-regular',
    fontSize: 12,
    color: Colors.light
  },
  progressText: {
    fontFamily: 'open-sans-regular',
    fontSize: 12,
    color: Colors.dark
  },
  steps: {
    width: 146 * 0.5,
    height: 29 * 0.5
  }
})

export default class Progress extends Component {
  render () {
    const { current, total, title, style } = this.props

    let image
    if (current === 1) {
      image = require(`./images/steps1.png`)
    } else if (this.props.current === 2) {
      image = require(`./images/steps2.png`)
    } else if (this.props.current === 3) {
      image = require(`./images/steps3.png`)
    }

    return (
      <View style={[styles.container, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.progressText}>
            {` - ${current}/${total}`}
          </Text>
        </View>
        <Image style={styles.steps} source={image} />
      </View>
    )
  }
}
