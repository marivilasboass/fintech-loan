import React from 'react'
import View from '../View'

export default class BottomSheetManager extends React.Component {
  state = {
    isVisible: false
  }

  toggle = () => this.setState(prevState => ({ isVisible: !prevState.isVisible }))

  render () {
    const { children, ...otherProps } = this.props
    const { isVisible } = this.state
    const passedProps = {
      ...otherProps,
      isVisible,
      toggle: this.toggle
    }

    return (
      <View>
        {children(passedProps)}
      </View>
    )
  }
}
