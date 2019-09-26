import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import View from '../View'
import Typography from '../Typography'
import Colors from '../Colors'
import Spacing from '../Spacing'
import CloseChip from './icons/CloseChip'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.veryLightBlue,
    paddingHorizontal: Spacing.s3,
    paddingVertical: Spacing.s1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.veryLightBlue
  },
  text: {
    color: Colors.darkTextGray,
    lineHeight: 18
  },
  closeButton: {
    paddingLeft: Spacing.s5
  },
  selectableStyle: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.veryLightBlue
  }
})

export default class Chip extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.text !== nextProps.text
  }

  renderContent = () => {
    const { text, style, textStyle, onClose, selectable } = this.props
    const containerStyle = [styles.container].concat(style)
    return (
      <View style={[containerStyle].concat(selectable && styles.selectableStyle)} >
        <Typography.T2 variant='semibold' style={[styles.text].concat(textStyle)}>{text}</Typography.T2>
        {onClose && <View style={styles.closeButton}><CloseChip /></View>}
      </View>
    )
  }

  render () {
    const { onClose, onPress } = this.props
    if (onClose || onPress) {
      return (
        <TouchableWithoutFeedback onPress={onClose || onPress}>
          {this.renderContent()}
        </TouchableWithoutFeedback>
      )
    }
    return this.renderContent()
  }
}
