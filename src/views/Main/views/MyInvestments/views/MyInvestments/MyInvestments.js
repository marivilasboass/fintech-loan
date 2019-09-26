import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Colors, Spacing, Button, View, HeaderButton, FixedHeader, Icon } from '~/newUI'
import { Filter } from '../../components'
import ListNavigator from '../ListNavigator'

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: Spacing.s6,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  }
})

export default class MyInvestments extends React.PureComponent {
  state = {
    active: false
  }

  componentDidUpdate (prevProps) {
    const { screenProps } = this.props
    if (!this.props.error) {
      return
    }
    if (prevProps.error !== this.props.error) {
      Alert.alert(
        'Ops!',
        this.props.error,
        [{ text: 'voltar', onPress: () => screenProps.navigation.navigate('Investments') }],
        { cancelable: false }
      )
    }
  }

  toggleFilter = () => this.setState({ active: !this.state.active })

  navigateToNewInvestment = () => {
    const { featureFlags, screenProps } = this.props
    if (featureFlags.enableSemiAutomaticMatch) {
      screenProps.navigation.navigate('AutomaticMatch')
      return
    }
    screenProps.navigation.navigate('Investments')
  }

  render () {
    const { navigation, screenProps } = this.props
    const { active } = this.state
    return (
      <React.Fragment>
        <View style={styles.viewContainer}>
          <FixedHeader
            leftComponent={(
              <HeaderButton onPress={() => screenProps.navigation.goBack()}>
                <Icon type='svg' name='ChevronLeft' color={Colors.white} />
              </HeaderButton>
            )}
            /* rightComponent={(
              <HeaderButton onPress={this.toggleFilter}>
                <OldIcons type='sliders' style={{ color: Colors.white }} />
              </HeaderButton>
            )} */
            centerTitle={'Meus Investimentos'}
          />
          <ListNavigator navigation={navigation} />
        </View>
        <View style={styles.buttonContainer} paddedHorizontally>
          <Button title='Novo investimento' onPress={this.navigateToNewInvestment} />
        </View>
        <Filter onClose={this.toggleFilter} active={active} />
      </React.Fragment>
    )
  }
}
