import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import Icon from './Icon'
import Colors from './Colors'

const styles = StyleSheet.create({
  wrap: {
    width: 50,
    height: 50
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    width: 30,
    height: 30,
    margin: 10
  },
  checked: {
    color: Colors.primary,
    position: 'absolute',
    fontSize: 35,
    top: 3,
    right: 3
  }
})

export default class Checkbox extends React.Component {
  state = {
    checked: false
  }

  componentWillReceiveProps (props) {
    this.setState({
      checked: !!props.checked
    })
  }

  onChange = () => {
    const checked = !this.state.checked
    const { onChange } = this.props

    this.setState({ checked }, () => {
      onChange(checked)
    })
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={this.onChange}>
        <View style={styles.wrap}>
          {this.state.checked && (
            <Icon style={styles.checked} type={'checked'} />
          )}
          <View style={styles.box} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
