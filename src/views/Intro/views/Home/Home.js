import React from 'react'
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { environment } from '~/../config'
import StorybookUI from '~/../storybook'
import { Button, View, Spacing, Colors, Text } from '~/newUI'

import backgroundImage from '../../images/background.jpg'
import { Logo } from '~/newUI/Icons'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    width: null,
    height: null,
    padding: Spacing.s8,
    flexGrow: 1
  },
  wrapLogo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  wrapButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch'
  },
  logo: {
    marginTop: Spacing.s10,
    marginBottom: Spacing.s8
  },
  slogan: {
    color: Colors.white,
    width: 220
  },
  login: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontFamily: 'open-sans-regular',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})

export default class Home extends React.PureComponent {
  renderLogo = () => {
    const LogoComponent = () => <Logo squareColor={Colors.white} style={styles.logo} />

    if (environment !== 'production') {
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({ storybook: true })}>
          {LogoComponent()}
        </TouchableWithoutFeedback>
      )
    }
    return LogoComponent()
  }

  render () {
    if (this.state && this.state.storybook) {
      return <StorybookUI />
    }

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ImageBackground style={styles.imageBackground} source={backgroundImage}>
          <View style={styles.wrapLogo}>
            {this.renderLogo()}

            <Text.H1 variant='black' style={styles.slogan}>
              Pessoas emprestando para pessoas, simples assim.
            </Text.H1>
          </View>
          <View style={styles.wrapButtons}>
            <Button
              title='Criar uma conta'
              onPress={() => navigate('CreateProfile')}
            />
            <Text
              style={styles.login}
              onPress={() => navigate('Login')}
            >
              Já tenho uma conta
            </Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
