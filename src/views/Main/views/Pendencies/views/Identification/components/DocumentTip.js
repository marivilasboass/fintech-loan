import React from 'react'
import { StyleSheet } from 'react-native'

import { Spacing, Row, Colors, Text, View } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.s5,
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing.s2
  },
  border: {
    borderBottomColor: Colors.mercury,
    borderBottomWidth: 1
  },
  icon: {
    paddingRight: Spacing.s8
  },
  textContent: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default class DocumentTip extends React.PureComponent {
  render () {
    const { withoutBorder, text, Icon } = this.props
    return (
      <React.Fragment>
        <Row style={styles.container} >
          {Icon && (
            <View style={styles.icon}>
              <Icon height={66} width={66} />
            </View>
          )}
          <View style={styles.textContent}>
            <Text.H5 variant='bold' color={Colors.marineBlue}>{text}</Text.H5>
          </View>
        </Row>
        {!withoutBorder && <View style={styles.border} /> }
      </React.Fragment>
    )
  }
}
