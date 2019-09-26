import React from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import * as R from 'ramda'

import Colors from '../../Colors'
import View from '../../View'
import Text from '../../Text'
import Modal from '../../Modal'
import Touch from '../../Touch'

var styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 4,
    flex: 1
  },
  option: {
    textAlign: 'center',
    paddingVertical: 15
  },
  selectedOption: {
    color: Colors.secondary
  },
  optionSeparator: {
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1
  },
  optionContainer: {
    backgroundColor: Colors.background,
    width: Dimensions.get('window').width - 8,
    borderRadius: 10
  }
})

export default class Options extends React.Component {
  static defaultProps = {
    optionsMaxHeight: 400
  }

  state = {
    maxHeight: this.props.optionsMaxHeight
  }

  setMaxHeight = e => {
    const { maxHeight } = this.state
    const { optionsMaxHeight } = this.props
    const height = Math.floor(e.nativeEvent.layout.height)
    if (height > maxHeight) {
      this.setState({ maxHeight: Math.min(height, optionsMaxHeight) })
    }
  }

  render () {
    const {
      modalVisible,
      data,
      toggleSelector,
      onChange,
      value,
      ...otherProps
    } = this.props

    return (
      <Modal
        {...otherProps}
        avoidKeyboard
        isVisible={modalVisible}
        onBackButtonPress={toggleSelector}
        onBackdropPress={toggleSelector}
        style={styles.modal}
      >
        <View
          style={[styles.optionContainer]}
          onLayout={this.setMaxHeight}
        >
          <ScrollView style={{ maxHeight: this.state.maxHeight }}>
            {
              data.map((option, index) => {
                const textStyles = [
                  styles.option,
                  R.equals(value, option.value) && styles.selectedOption
                ]

                return (
                  <Touch
                    key={R.toString(option.value)}
                    onPress={() => {
                      toggleSelector()
                      onChange(option)
                    }}
                  >
                    <View style={index !== data.length - 1 && styles.optionSeparator}>
                      <Text.T2 style={textStyles}>
                        { option.label }
                      </Text.T2>
                    </View>
                  </Touch>
                )
              })
            }
          </ScrollView>
        </View>
      </Modal>
    )
  }
}
