import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { View, Spacing, Colors, Typography } from '~/newUI'
import { ChevronRight } from '~/newUI/Icons'
import ModalSelector from '~/components/ModalSelector'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: Spacing.s5,
    borderTopColor: Colors.dashed,
    flexDirection: 'row',
    marginLeft: Spacing.s6,
    justifyContent: 'space-between'
  },
  info: {
    flexDirection: 'row',
    marginRight: Spacing.s6
  },
  infoText: {
    marginRight: 5
  },
  pendencyIcon: {
    width: 19,
    height: 19,
    borderRadius: 13.5,
    backgroundColor: Colors.orange,
    paddingTop: 2,
    marginLeft: 4,
    marginRight: -3
  }
})

export default class InfoCardLine extends React.PureComponent {
  state = {
    itemWidth: null
  }

  renderInfo = () => {
    const { hideSeparator, line } = this.props
    const { label, info, onPress, labelStyle, hasPendency, onPressType } = line
    const { itemWidth } = this.state
    return (
      <TouchableWithoutFeedback disabled={onPressType === 'modal'} onPress={onPress}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          this.setState({ itemWidth: width })
        }}>
        <View style={[styles.container, hideSeparator && { borderTopWidth: 0 }]}>
          <Typography.T2 style={labelStyle}>{label}</Typography.T2>
          <View style={styles.info}>
            <Typography.T2 numberOfLines={1} style={[styles.infoText, { maxWidth: itemWidth * 0.65 }]} color={Colors.warmGray}>{info}</Typography.T2>
            { hasPendency && (
              <View style={styles.pendencyIcon}>
                <Typography.T6 style={{ alignSelf: 'center' }} variant={'bold'} color={Colors.white}>!</Typography.T6>
              </View>
            )}
            { onPress || onPressType
              ? <ChevronRight color={Colors.warmGray} width={6} height={11} />
              : <View style={{ marginLeft: 14, width: 6 }} />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  onSelected = (item) => {
    item && item.onPress && item.onPress()
  }

  render () {
    const { onPressType, modalOptions } = this.props.line
    if (onPressType === 'modal') {
      return (
        <ModalSelector
          modalOptions={modalOptions}
        >
          {this.renderInfo()}
        </ModalSelector>
      )
    }
    return this.renderInfo()
  }
}
