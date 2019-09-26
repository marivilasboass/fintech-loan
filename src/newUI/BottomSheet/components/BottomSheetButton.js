import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '~/newUI'

const styles = StyleSheet.create({
  button: {
    borderRadius: 0
  }
})

export default class BottomSheetButton extends React.Component {
  render () {
    const { style, ...props } = this.props
    return (
      <Button secondary style={[style].concat(styles.button)} {...props} />
    )
  }
}
