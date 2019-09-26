import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 20,
    maxHeight: 50,
    borderWidth: 0
  }
})

export default class AlertInput extends React.PureComponent {
  static defaultProps = {
    onChange: () => { throw new Error('AlertInput expects a onChange prop') }
  }

  render () {
    const { onChange, ...props } = this.props
    return (
      <TextInput
        {...props}
        onChange={() => {}}
        onChangeText={onChange}
        autoFocus
        multiline
        underlineColorAndroid={'transparent'}
        numberOfLines={2}
        placeholder='Digite aqui...'
        style={[styles.input]}
      />
    )
  }
}
