import React from 'react'
import { Image, View } from 'react-native'

import BB from './images/BB.png'
import Bradesco from './images/Bradesco.png'
import CEF from './images/CEF.png'
import Itau from './images/Itau.png'
import Santander from './images/Santander.png'
import Inter from './images/Inter.png'
import Banrisul from './images/Banrisul.png'

const cardImages = {
  BB,
  Bradesco,
  CEF,
  Itau,
  Santander,
  Inter,
  Banrisul
}

export default class BankCardImage extends React.PureComponent {
  state = {
    width: null
  }

  render () {
    const { bankShortName, style, ...props } = this.props
    const { width } = this.state
    const cardImage = cardImages[bankShortName]

    // Set height proportionally using max width available
    const imageStyle = [width && { width, height: width * 550 / 1070 }].concat(style)

    return (
      <View onLayout={event => this.setState({ width: event.nativeEvent.layout.width })}>
        <Image {...props} style={imageStyle} source={cardImage} resizeMode='contain' />
      </View>
    )
  }
}
