import React, { PureComponent } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo'
import Colors from '../Colors'

const styles = StyleSheet.create({

  image: {
    height: 300
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  }
})

export default class BackgroundSelfie extends PureComponent {
  render () {
    const { image, gradient, children } = this.props
    return (
      <ImageBackground source={image} style={styles.image} resizeMode='cover'>
        { gradient && (
          <LinearGradient
            colors={[ 'transparent', Colors.black ]}
            style={styles.gradient}
            start={[1, 0.6]}
            end={[1, 1]}
          />
        )}
        {children}
      </ImageBackground>
    )
  }
}
