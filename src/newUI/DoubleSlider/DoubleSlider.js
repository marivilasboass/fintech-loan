import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { StyleSheet } from 'react-native'
import Colors from '../Colors'
import DefaultMarker from './components/DefaultMarker'

const trackHeight = 8

const styles = StyleSheet.create({
  track: {
    borderRadius: trackHeight / 2,
    height: trackHeight,
    top: -(trackHeight / 2),
    backgroundColor: Colors.lineGray
  },
  selectedArea: {
    backgroundColor: Colors.focused
  }
})

export default class DoubleSlider extends React.PureComponent {
  render () {
    const { values, min, max, step, onValuesChange, sliderLength } = this.props

    return (
      <MultiSlider
        values={values}
        trackStyle={styles.track}
        markerOffsetX={12}
        selectedStyle={styles.selectedArea}
        customMarkerLeft={() => <DefaultMarker />}
        customMarkerRight={() => <DefaultMarker />}
        isMarkersSeparated
        min={min}
        max={max}
        step={step}
        onValuesChange={onValuesChange}
        sliderLength={sliderLength}
      />
    )
  }
}
