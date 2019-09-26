import React from 'react'
import { StyleSheet, Image } from 'react-native'
import faceOkImage from '../images/face-ok.png'

const styles = StyleSheet.create({
  centerText: {
    alignSelf: 'center'
  }
})

export default class AlertImage extends React.PureComponent {
  render () {
    const { source, imageStyle } = this.props
    return <Image style={[styles.centerText, imageStyle]} source={source || faceOkImage} />
  }
}
