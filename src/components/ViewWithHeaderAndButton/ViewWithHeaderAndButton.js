import React from 'react'
import { StyleSheet, Keyboard, Platform } from 'react-native'
import { Colors, View, BaseHeader, HeaderButton, Icon, KeyboardAwareScrollView } from '~/newUI'
import { getChildrenOfClass, isNotOfComponentClasses } from '~/utils/elementsHelpers'

import Content from './components/Content'
import Header from './components/Header'
import Button from './components/Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },

  scrollViewContent: {
    flexGrow: 1
  },

  fixedHeaderBackground: {
    backgroundColor: Colors.marineBlue,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  withBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray
  }
})

export default class ViewWithHeaderAndButton extends React.PureComponent {
  static defaultProps = {
    fixedHeaderSize: 400
  }

  state = {
    keyboardOpen: false
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = () => {
    this.setState({ keyboardOpen: true })
  }

  keyboardDidHide = () => {
    this.setState({ keyboardOpen: false })
  }

  render () {
    const { backgroundType, fixedHeaderSize, buttonBorder, hideButtonWhenKeyboardOpen, onPressBack, rightIcon, onRightIconPress, backIcon, style, chevronColor, children, refreshControl, rightComponent } = this.props
    const { keyboardOpen } = this.state

    const passedChrevonColor = chevronColor ||
      (backgroundType === 'none' ? Colors.brightBlue : Colors.white)

    const header = getChildrenOfClass(Header, children)[0]
    const content = getChildrenOfClass(Content, children)[0]
    const button = getChildrenOfClass(Button, children)[0]

    if (!header || !content || !button) {
      throw new Error('ViewWithHeaderAndButton requires a Header, Content and Button')
    }

    const otherChildren = isNotOfComponentClasses([Header, Content, Button])(children)

    if (otherChildren.length > 0) {
      throw new Error('Invalid child passed to ViewWithHeaderAndButton. Please pass only Header, Content and Button')
    }

    const barStyle = backgroundType === 'none' ? 'dark-content' : 'light-content'
    const backgroundColor = backgroundType === 'none' ? Colors.white : Colors.marineBlue

    const rightHeaderComponent = rightIcon ? (
      <HeaderButton right onPress={onRightIconPress}>
        {rightIcon}
      </HeaderButton>
    ) : rightComponent

    const leftHeaderComponent = (
      <HeaderButton onPress={onPressBack}>
        {backIcon || <Icon type='svg' name='BackArrow' color={passedChrevonColor} />}
      </HeaderButton>
    )

    return (
      <View style={[styles.container].concat(style)}>
        <BaseHeader
          backgroundColor={backgroundColor}
          statusBarProps={{ barStyle, backgroundColor }}
          leftComponent={leftHeaderComponent}
          rightComponent={rightHeaderComponent}
        />

        {backgroundType === 'fixed' && (
          <View style={[styles.fixedHeaderBackground].concat({ height: fixedHeaderSize })} />
        )}

        {React.cloneElement(header, {
          blue: backgroundType === 'header'
        })}

        <KeyboardAwareScrollView refreshControl={refreshControl} contentContainerStyle={styles.scrollViewContent}>
          {content}
        </KeyboardAwareScrollView>
        <View style={buttonBorder && styles.withBorder}>
          {React.cloneElement(button, {
            keyboardOpen,
            hideWhenKeyboardOpen: hideButtonWhenKeyboardOpen
          })}
        </View>
      </View>
    )
  }
}

ViewWithHeaderAndButton.Header = Header
ViewWithHeaderAndButton.Content = Content
ViewWithHeaderAndButton.Button = Button
