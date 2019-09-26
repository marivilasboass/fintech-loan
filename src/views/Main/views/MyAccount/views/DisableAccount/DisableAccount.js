import React from 'react'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { View, Typography, Spacing, Colors, Message, Button } from '~/newUI'

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercury,
    alignItems: 'center',
    paddingVertical: Spacing.s5
  },
  message: {
    marginVertical: Spacing.s7,
    height: 64,
    alignItems: 'center'
  },
  button: {
    borderRadius: 0,
    backgroundColor: Colors.brightBlue,
    height: 48,
    marginBottom: 1
  }
})

export default class DisableAccount extends React.PureComponent {
  state = {
    loading: false
  }

  deleteAccount = async () => {
    const { userType, deleteAccount, logout } = this.props
    this.setState({ loading: true })

    await deleteAccount(userType)

    this.setState({ loading: false })

    if (this.props.error) {
      Alert.alert('Erro', this.props.error)
      return
    }
    Alert.alert('Conta Desativada', 'Sua conta foi desativada com sucesso e você será bem vindo para voltar quando quiser :)',
      [{ text: 'OK', onPress: () => logout() }],
      { cancelable: false }
    )
  }

  render () {
    const { loading } = this.state
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <React.Fragment>
          <View style={styles.header}>
            <Typography.T1>Desativar Conta</Typography.T1>
          </View>
          <View paddedHorizontally>
            <Typography.T2 style={{ marginVertical: Spacing.s7 }}>Que pena, realmente acha que não vai usar mais o aplicativo da Mutual?</Typography.T2>
            <Typography.T2>Se deseja continuar, cuidaremos disso para você. Mas é importante estar ciente, mesmo que a sua conta seja cancelada, você não conseguirá mais criar outra em nosso sistema futuramente.</Typography.T2>
            <Message style={styles.message} variant={'info'}>
              <Typography.T3 align='center'>
              Essa ação não poderá ser desfeita, tem certeza que deseja desativar a sua conta?
              </Typography.T3>
            </Message>
          </View>
          <Button loading={loading} onPress={() => this.deleteAccount()} title={'Estou ciente, desative minha conta'} style={styles.button} textStyle={{ fontSize: 16 }} />
        </React.Fragment>
      </ScrollView>
    )
  }
}
