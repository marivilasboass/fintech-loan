import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Colors, BaseHeader, Shadow, Text } from '~/newUI'
import * as Animations from '~/newUI/Animations'

import imagebg from './images/bg_toast.png'

const styles = StyleSheet.create({
  shadowInner: {
    borderWidth: 0
  },

  shadowOuter: {
    zIndex: 1
  },

  fadeWrapper: {
    ...StyleSheet.absoluteFillObject,
    top: 20,
    zIndex: 2
  }
})

export default class BankSlipHeader extends React.PureComponent {
  render () {
    const { active } = this.props

    const barProps = active
      ? { barStyle: 'light-content', backgroundColor: Colors.marineBlue }
      : { barStyle: 'dark-content', backgroundColor: Colors.white }

    return (
      <React.Fragment>
        <Shadow
          layout='auto' opacity={0.15} color={Colors.black}
          innerStyle={styles.shadowInner}
          outerStyle={styles.shadowOuter}
        >
          <BaseHeader
            backgroundColor={active ? Colors.marineBlue : Colors.white}
            statusBarProps={barProps}
            style={[!active && { height: 21 }, { zIndex: -1 }]}
          />
        </Shadow>
        <Animations.Fade visible={active} style={styles.fadeWrapper} duration={200}>
          <ImageBackground source={imagebg} style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Text.T3 color={Colors.white} align='center'>Código de barras copiado</Text.T3>
          </ImageBackground>
        </Animations.Fade>
      </React.Fragment>
    )
  }
}
