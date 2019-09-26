import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import OptionsIcon from './icon/OptionsIcon'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})

type Props = {
  onPress: () => void
}

export default class FilterIndicator extends React.PureComponent<Props> {
  render () {
    const { onPress } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <OptionsIcon />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
