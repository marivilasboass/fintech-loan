import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Slider } from 'react-native-elements'
import Colors from './Colors'

const styles = StyleSheet.create({
  track: {
    backgroundColor: Colors.border
  },
  thumb: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    borderWidth: 8,
    width: 26,
    height: 26,
    borderRadius: 80
  }
})

export default class SliderKit extends Component {
  single () {
    const { style, ...otherProps } = this.props

    return (
      <Slider
        style={[styles.slider, style]}
        step={this.props.step || 1}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        minimumTrackTintColor={Colors.primary}
        {...otherProps}
      />
    )
  }
  multiple () {
    return this.single()
  }
  render () {
    return (Array.isArray(this.props.value) || this.props.multiple) ? this.multiple() : this.single()
  }
}
