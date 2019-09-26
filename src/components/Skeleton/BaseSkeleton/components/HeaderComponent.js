import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors } from '~/UI'

const styles = StyleSheet.create({
  emptyIcon: {
    width: 30,
    height: 30
  },
  componentContainer: {
    width: 65,
    height: 65,
    justifyContent: 'center'
  }
})

class HeaderComponent extends React.PureComponent {
  static defaultProps = {
    onPress: () => {}
  }

  render () {
    const { icon, onPress, iconType, component, style } = this.props

    let componentToRender
    const componentContainerStyle = [styles.componentContainer, style]

    if (component) {
      componentToRender = (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={componentContainerStyle}>
            {component}
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (icon) {
      componentToRender = (
        <Icon
          name={icon}
          type={iconType}
          size={30}
          color={Colors.white}
          onPress={onPress}
          underlayColor='transparent'
          containerStyle={componentContainerStyle}
        />
      )
    } else {
      componentToRender = (
        <View style={componentContainerStyle}>
          <View style={styles.emptyIcon} />
        </View>
      )
    }

    return componentToRender
  }
}

export default HeaderComponent
