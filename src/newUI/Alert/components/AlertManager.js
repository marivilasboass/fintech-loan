import React from 'react'

import View from '../../View'

export default class AlertManager extends React.Component {
  state = {
    isVisible: false
  }

  show = () => this.setState({ isVisible: true })
  hide = () => this.setState({ isVisible: false })

  render () {
    const { children, ...otherProps } = this.props
    const { isVisible } = this.state
    const passedProps = {
      ...otherProps,
      isVisible,
      onBackdropPress: this.hide,
      hide: this.hide,
      show: this.show
    }

    return (
      <View>
        {children(passedProps)}
      </View>
    )
  }
}
