import React from 'react'
import { StyleSheet } from 'react-native'

import { Password, Colors, View, Spacing, Text, Button, KeyboardAwareScrollView } from '~/newUI'
import CreateProfileHeader from '../../components/CreateProfileHeader'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s12 + Spacing.s1,
    justifyContent: 'space-between'
  },

  title: {
    marginBottom: Spacing.s2,
    paddingHorizontal: Spacing.s12
  },

  subtitle: {
    marginBottom: Spacing.s13,
    paddingHorizontal: Spacing.s10
  }
})

export default class CreatePassword extends React.PureComponent {
  state = {
    disabledButton: false
  }
  handlePassword = (password) => {
    this.props.update({ password })
    if (password.length === 6) {
      this.setState({ disabledButton: true })
    } else {
      this.setState({ disabledButton: false })
    }
  }

  submit = () => {
    this.props.navigation.navigate('Terms')
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <CreateProfileHeader onBack={this.onBack} />
          <View style={styles.container}>
            <View>
              <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
                Agora só falta criar uma senha
              </Text.T1>
              <Text.T3 align='center' style={styles.subtitle}>
                Sua senha deve ser uma combinação de seis números:
              </Text.T3>
              <Password value={this.props.password} onChange={this.handlePassword} />
            </View>

            <Button
              disabled={!this.state.disabledButton}
              iconRight={{ name: 'arrow-forward', size: 20 }}
              title='Próximo'
              onPress={this.submit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
