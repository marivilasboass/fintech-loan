import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '~/newUI'

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 17
  }
})

export default class FilterTitledContainer extends React.PureComponent {
  static defaultProps = {
    TextComponent: Text
  }

  render () {
    const { children, title, titleStyle, TextComponent, outerStyle, innerStyle, textVariant, SubTitle } = this.props
    return (
      <View style={outerStyle}>
        <View style={[styles.containerStyle].concat(innerStyle)}>
          <TextComponent style={titleStyle} variant={textVariant}>{title}</TextComponent>
          {SubTitle}
        </View>
        {children}
      </View>
    )
  }
}
