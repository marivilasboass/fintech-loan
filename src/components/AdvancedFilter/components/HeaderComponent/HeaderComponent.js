import React, { PureComponent } from 'React'
import { StyleSheet } from 'react-native'
import { Text, View, Spacing, Colors, Touch } from '~/newUI'
import HeaderButton from './HeaderButton'
import { ChevronLeft } from '~/newUI/Icons'

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%'
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercury,
    justifyContent: 'space-between',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingVertical: Spacing.s5,
    zIndex: 2,
    paddingHorizontal: Spacing.s6
  },
  backButton: {
    position: 'relative',
    paddingVertical: Spacing.s5,
    width: 60,
    zIndex: 2,
    alignItems: 'center'
  }
})

export default class HeaderComponent extends PureComponent {
  renderBackButton = () => {
    const { onBack } = this.props
    return onBack ? (
      <Touch onPress={onBack}>
        <View style={styles.backButton}>
          <ChevronLeft color={Colors.darkestGray} />
        </View>
      </Touch>
    ) : null
  }

  render () {
    const { leftComponent, rightComponent, title } = this.props
    return (
      <View style={styles.header}>
        {this.renderBackButton()}
        {leftComponent && <HeaderButton style={styles.button} {...leftComponent} />}
        <Text.T3 align='center' style={styles.title} variant={'heavy'}>
          {title}
        </Text.T3>
        {rightComponent && <HeaderButton style={styles.button} {...rightComponent} />}
      </View>
    )
  }
}
