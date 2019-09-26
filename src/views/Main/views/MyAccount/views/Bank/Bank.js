import React from 'react'
import R from 'ramda'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Typography, Spacing, Colors, Button, Message, Modal } from '~/newUI'
import banks from '~/constants/banks'
import BankQuestionnaire from './components/BankQuestionnaire'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercury,
    alignItems: 'center',
    paddingVertical: Spacing.s5
  },
  textContainer: {
    marginVertical: Spacing.s3
  },
  agencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '20%'
  },
  titleLabel: {
    opacity: 0.7,
    color: Colors.nightRider,
    marginBottom: 2
  },
  message: {
    marginVertical: Spacing.s7,
    marginHorizontal: Spacing.s6,
    height: 64,
    alignItems: 'center'
  },
  button: {
    borderRadius: 0,
    height: 48,
    marginBottom: 1
  }
})

const filterBankData = R.pick([
  'code',
  'accountType', 'account',
  'agency'
])

export default class Bank extends React.PureComponent {
  constructor (props) {
    super(props)

    const bankData = filterBankData(this.props)

    this.state = {
      ...bankData,
      checked: false,
      loading: false
    }
  }

  hyphenateLastDigit = (value) => {
    const expr = /-/

    if (expr.test(value)) {
      return value
    }

    const firstPart = value.substring(0, value.length - 1)
    const digit = value.substring(value.length - 1, value.length)
    return `${firstPart}-${digit}`
  }

  handleModalVisibility = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    const {
      code, accountType,
      agency, account,
      showModal
    } = this.state
    const { hasPendingBankChange } = this.props
    const message = hasPendingBankChange
      ? 'Você já solicitou uma atualização dos dados bancários, aguarde a nossa validação.'
      : 'Obrigatóriamente toda conta bancária precisa estar registrada em seu nome e CPF.'
    const accountTypeText = accountType === 'cc' ? 'Conta Corrente' : 'Conta poupança'
    const accountAndDigit = this.hyphenateLastDigit(account)
    const bankInfo = banks[code]

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <React.Fragment>
          <View style={styles.header}>
            <Typography.T1>Conta bancária</Typography.T1>
          </View>
          <View style={{ marginLeft: 20, marginTop: Spacing.s3 }}>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>Banco</Typography.T3>
              <Typography.T2>{`${code} - ${bankInfo.name}`}</Typography.T2>
            </View>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>Tipo</Typography.T3>
              <Typography.T2>{accountTypeText}</Typography.T2>
            </View>
            <View style={[styles.textContainer].concat(styles.agencyContainer)}>
              <View>
                <Typography.T3 style={styles.titleLabel}>Agência</Typography.T3>
                <Typography.T2>{agency}</Typography.T2>
              </View>
              <View>
                <Typography.T3 style={styles.titleLabel}>Conta e digito</Typography.T3>
                <Typography.T2>{accountAndDigit}</Typography.T2>
              </View>
            </View>
          </View>
          <Message style={styles.message} variant={'info'}>
            <Typography.T3 style={{ textAlign: 'center' }}>
              {message}
            </Typography.T3>
          </Message>
          <Button secondary disabled={hasPendingBankChange} onPress={this.handleModalVisibility} title={'Editar meus dados bancários'} style={styles.button} textStyle={{ fontSize: 16 }} />
          <Modal hideCloseIcon isVisible={showModal} fullscreen>
            <BankQuestionnaire {...this.props} onClose={this.handleModalVisibility} />
          </Modal>
        </React.Fragment>
      </ScrollView>
    )
  }
}
