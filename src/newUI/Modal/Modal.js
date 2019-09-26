import React from 'react'
import { Constants } from 'expo'
import { StyleSheet, Platform } from 'react-native'
import Modal from 'react-native-modal'

import View from '../View'
import Colors from '../Colors'
import FullScreenModalCloseIcon from './components/FullScreenModalCloseIcon'
import Spacing from '../Spacing'
import Touch from '../Touch'

const navbarPadding = Platform.OS === 'ios' ? Constants.statusBarHeight : 0

const styles = StyleSheet.create({
  fullscreenModal: {
    flex: 1,
    margin: 0
  },
  fullscreenModalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: navbarPadding
  },
  closeIcon: {
    zIndex: 100,
    position: 'absolute',
    right: Spacing.s5,
    top: navbarPadding,
    padding: Spacing.s3
  }
})

export default class ModalKit extends React.PureComponent {
  static defaultProps = {
    // animationIn: 'fadeIn',
    // animationOut: 'fadeOut',
    animationInTiming: 500,
    animationOutTiming: 500,
    backdropColor: Colors.stage
  }

  render () {
    const { fullscreen, onCloseModal, style, containerStyle, hideCloseIcon } = this.props

    if (!fullscreen) {
      return <Modal {...this.props} />
    }

    return (
      <Modal {...this.props} style={[styles.fullscreenModal].concat(style)}>
        { !hideCloseIcon && (
          <Touch onPress={onCloseModal}>
            <View style={styles.closeIcon}>
              <FullScreenModalCloseIcon onClose={onCloseModal} />
            </View>
          </Touch>
        )}

        <View style={[styles.fullscreenModalContainer].concat(containerStyle)}>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}
