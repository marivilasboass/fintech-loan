import * as React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Colors from '../../Colors'
import Row from '../../Row'
import Spacing from '../../Spacing'
import Typography from '../../Typography'

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    marginLeft: Spacing.s2
  }
})

class CenterComponent extends React.Component {
  render () {
    const { text, onPress, icon } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Row style={styles.centerContainer}>
          <Typography.T1 color={Colors.white}>{text}</Typography.T1>
          <View style={styles.iconContainer}>
            {icon}
          </View>
        </Row>
      </TouchableWithoutFeedback>
    )
  }
}

export default CenterComponent
