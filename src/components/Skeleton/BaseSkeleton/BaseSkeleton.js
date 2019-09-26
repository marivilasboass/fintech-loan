import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '~/UI'
import { BaseHeader } from '~/newUI'
import HeaderComponent from './components/HeaderComponent'
import CenterComponent from './components/CenterComponent'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default class Skeleton extends React.PureComponent {
  render () {
    const {
      style, children, banner, color,
      rightIcon, rightIconType, rightComponent, onRightPress, centerIcon,
      leftIcon, leftIconType, leftComponent, onLeftPress, onCenterPress,
      ...otherProps
    } = this.props

    const leftComponentProps = {
      icon: leftIcon,
      onPress: onLeftPress,
      iconType: leftIconType,
      component: leftComponent,
      style: {
        alignItems: 'flex-start',
        paddingLeft: leftIcon ? 8 : 10,
        paddingRight: leftIcon ? 2 : 0
      }
    }

    const rightComponentProps = {
      icon: rightIcon,
      onPress: onRightPress,
      iconType: rightIconType,
      component: rightComponent,
      style: {
        alignItems: 'flex-end',
        paddingLeft: rightIcon ? 2 : 0,
        paddingRight: rightIcon ? 8 : 10
      }
    }

    return (
      <View style={styles.container}>
        <BaseHeader
          backgroundColor={color}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: color }}
          leftComponent={<HeaderComponent {...leftComponentProps} />}
          centerComponent={<CenterComponent text={banner} icon={centerIcon} onPress={onCenterPress} />}
          rightComponent={<HeaderComponent {...rightComponentProps} />}
          {...otherProps}
        />
        <View style={[styles.content, style]}>
          {children}
        </View>
      </View>
    )
  }
}
