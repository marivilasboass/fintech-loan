import React from 'react'
import { StyleSheet } from 'react-native'

import HeaderButton from '../HeaderButton'
import Colors from '../Colors'
import Spacing from '../Spacing'
import Icon from '../Icon'
import Shadow from '../Shadow'
import BaseHeader from '../BaseHeader'
import View from '../View'
import Typography from '../Typography'

import CenterComponent from './components/CenterComponent'

const styles = StyleSheet.create({
  shadowInner: {
    borderWidth: 0
  },

  shadowOuter: {
    zIndex: 2
  }
})

export default class FixedHeader extends React.PureComponent {
  static defaultProps = {
    marginRight: Spacing.s6 * 3
  }

  renderLeftComponent = () => {
    const { navigation } = this.props
    return (
      <HeaderButton onPress={() => navigation.goBack()}>
        <Icon type='svg' name='ChevronLeft' color={Colors.white} />
      </HeaderButton>
    )
  }

  renderCenterComponent = () => {
    const { centerTitle, centerIcon, onCenterPress } = this.props
    if (centerIcon) {
      return (
        <CenterComponent
          onPress={onCenterPress}
          text={centerTitle}
          icon={centerIcon}
        />
      )
    }
    return (
      <Typography.T1 color={Colors.white}>{centerTitle}</Typography.T1>
    )
  }

  render () {
    const { leftComponent, rightComponent, centerTitle, shadowColor, marginRight, centerComponent, ...otherProps } = this.props

    return (
      <Shadow
        layout='auto' opacity={0.15} color={shadowColor || Colors.black}
        innerStyle={styles.shadowInner}
        outerStyle={styles.shadowOuter}
      >
        <BaseHeader
          backgroundColor={Colors.marineBlue}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: Colors.marineBlue }}
          rightComponent={rightComponent || <View style={{ marginRight }} />}
          leftComponent={leftComponent || this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          {...otherProps}
        />
      </Shadow>
    )
  }
}
