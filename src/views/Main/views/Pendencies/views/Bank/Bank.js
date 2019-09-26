import React from 'react'
import { StyleSheet, Keyboard } from 'react-native'

import { Input, Selector, Switcher, View, Alert, Checkbox } from '~/newUI'
import { validateBank } from '~/utils/validateBank'
import banks from '~/constants/banks'
import { track } from '~/services/analytics'

import PendencyPage from '~/components/PendencyPage'
import BankCardImage from '~/components/BankCardImage'

const styles = StyleSheet.create({
  bankSelector: {
    marginBottom: 13
  },
  switcher: {
    marginBottom: 17
  },
  image: {
    marginBottom: 17
  },
  accountInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  agency: {
    minWidth: 46
  },
  operation: {
    minWidth: 52
  },
  account: {
    minWidth: 33
  },
  digit: {
    minWidth: 33
  },
  content: {
    justifyContent: 'flex-start'
  }
})

const getErrorReasonText = ({ code, expected }) => {
  switch (code) {
  case 'INVALID_BRANCH_NUMBER_LENGTH':
    return `Por favor verifique se sua agência possui ${expected} dígitos. Caso necessário preencha com zeros à esquerda`
  case 'INVALID_BRANCH_DIGIT':
    return 'Por favor verifique se sua agência e dígito estão corretos'
  case 'INVALID_OPERATION_LENGTH':
    return `Por favor verifique se sua operação possui ${expected} dígitos.`
  case 'INVALID_ACCOUNT_DIGIT':
    return 'Por favor verifique se sua conta e dígito estão corretos'
  }

  return 'Por favor, verifique a sua agência e conta no cartão do seu banco'
}

const emptyState = {
  selectedBank: null,
  accountType: 'cc',
  operation: '',
  agency: '',
  agencyDigit: '',
  account: '',
  accountDigit: '',
  valid: false
}

export default class BankView extends React.PureComponent {
    state = emptyState

    hideAlert = () => {
      this.setState({ alert: null, loading: false })
    }

    onSubmit = async () => {
      track('BankConfirm')

      const { valid, reason } = this.state

      Keyboard.dismiss()

      if (!valid && !reason) {
        this.setState({
          alert: {
            title: 'Conta inválida',
            description: 'Por favor, preencha todos os campos'
          }
        })
        return
      }

      if (valid === false) {
        const reasonText = getErrorReasonText(reason)
        this.setState({
          alert: {
            title: 'Conta inválida',
            description: reasonText
          }
        })
        return
      }

      this.save()
    }

    save = async () => {
      const { selectedBank, accountType, agency, agencyDigit, operation, account, accountDigit } = this.state

      this.setState({ loading: true })

      const accountNumber = account
      const mergedAgency = `${agency}${agencyDigit}`
      const mergedAccount = `${operation}${accountNumber}${accountDigit}`

      const bankInfo = {
        accountType,
        account: mergedAccount,
        agency: mergedAgency,
        code: selectedBank.code
      }

      const success = await this.props.submitBank(bankInfo)
      if (!success) {
        this.setState({
          alert: {
            title: 'Erro',
            description: 'Não foi possível conectar-se a Mutual, tente novamente mais tarde'
          }
        })
        return
      }

      this.setState({ loading: false })

      this.props.navigation.navigate('PendenciesStatus')
    }

    onChangeBankCompany = ({ value }) => {
      this.setState({ ...emptyState, selectedBank: value })
    }

    handleAccountType = ({ value }) => {
      this.setState({ accountType: value })
    }

    onAgencyDigitExactLength = selectedBank => () => {
      selectedBank.accountOperationLength
        ? (this.operationInputRef && this.operationInputRef.focus())
        : (this.accountInputRef && this.accountInputRef.focus())
    }

    onAgencyExactLength = selectedBank => () => {
      selectedBank.agencyDigit
        ? (this.agencyDigitInputRef && this.agencyDigitInputRef.focus())
        : selectedBank.accountOperationLength
          ? (this.operationInputRef && this.operationInputRef.focus())
          : (this.accountInputRef && this.accountInputRef.focus())
    }

    onBankAccountChange = (change) => {
      const newState = { ...change }

      const bankData = { ...this.state, ...newState }
      this.setState(newState)

      const { operation, agency, agencyDigit, account, accountDigit } = bankData

      const code = this.state.selectedBank.code
      const validation = validateBank({
        code,
        branchNumber: agency,
        branchDigit: agencyDigit,
        operation,
        accountNumber: account,
        accountDigit
      })

      const { valid, reason, paddedAccountNumber } = validation

      this.setState({ valid, reason })
      if (paddedAccountNumber) {
        this.setState({ account: paddedAccountNumber })
      }
    }

    onCancel = () => {
      track('BankCancel')

      this.props.navigation.goBack(null)
    }

    render () {
      const { selectedBank, accountType, operation, agency, agencyDigit, account, accountDigit, alert, titularityConfirmed, loading } = this.state
      const [left, right] = [{ label: 'Conta corrente', value: 'cc' }, { label: 'Conta poupança', value: 'cp' }]
      const possibleBanks = Object.keys(banks).map(key => ({ value: banks[key], label: banks[key].name }))

      return (
        <PendencyPage
          title='Onde você quer receber seu dinheiro?'
          description='Essa conta deve estar em seu nome'
          contentStyle={styles.content}
          loading={loading}
          onNext={this.onSubmit}
          onCancel={this.onCancel}
          onBack={this.onCancel}
          disabled={!selectedBank || !titularityConfirmed}
        >
          <Selector
            value={selectedBank}
            label='Banco'
            onChange={this.onChangeBankCompany}
            style={styles.bankSelector}
            data={possibleBanks}
          />

          {selectedBank && (
            <View>
              <Switcher key='switcher' style={styles.switcher} left={left} right={right} value={accountType} onChange={this.handleAccountType} />

              <BankCardImage key='image' style={styles.image} bankShortName={selectedBank ? selectedBank.shortName : ''} />

              <View key='inputs' style={styles.accountInputs}>
                <Input
                  value={agency}
                  placeholder={selectedBank.agencyExample}
                  keyboardType='numeric'
                  onChange={agency => this.onBankAccountChange({ agency })}
                  exactLength={selectedBank.agencyLength}
                  onExactLength={this.onAgencyExactLength(selectedBank)}
                  label='Agência'
                  style={styles.agency}
                />

                {selectedBank.agencyDigit && (
                  <Input
                    value={agencyDigit}
                    placeholder={selectedBank.agencyDigitExample}
                    onChange={agencyDigit => this.onBankAccountChange({ agencyDigit })}
                    exactLength={1}
                    ref={ref => { this.agencyDigitInputRef = ref }}
                    onExactLength={this.onAgencyDigitExactLength(selectedBank)}
                    label='Dígito'
                    style={styles.digit}
                  />
                )}

                {selectedBank.accountOperationLength && (
                  <Input
                    value={operation}
                    placeholder={selectedBank.accountOperationExample}
                    keyboardType='numeric'
                    onChange={operation => this.onBankAccountChange({ operation })}
                    exactLength={selectedBank.accountOperationLength}
                    ref={ref => { this.operationInputRef = ref }}
                    onExactLength={() => this.accountInputRef && this.accountInputRef.focus()}
                    label='Operação'
                    style={styles.operation}
                  />
                )}

                <Input
                  value={account}
                  placeholder={selectedBank.accountExample}
                  keyboardType='numeric'
                  onChange={account => this.onBankAccountChange({ account })}
                  exactLength={selectedBank.accountLength}
                  ref={ref => { this.accountInputRef = ref }}
                  onExactLength={() => this.accountDigitInputRef && this.accountDigitInputRef.focus()}
                  label='Conta'
                  style={styles.account}
                />

                <Input
                  value={accountDigit}
                  placeholder={selectedBank.accountDigitExample}
                  onChange={accountDigit => this.onBankAccountChange({
                    accountDigit: typeof accountDigit === 'string' && accountDigit.toUpperCase()
                  })}
                  exactLength={1}
                  ref={ref => { this.accountDigitInputRef = ref }}
                  label='Dígito'
                  style={styles.digit}
                />
              </View>

              <Checkbox
                onChange={(titularityConfirmed) => this.setState({ titularityConfirmed })}
                checked={titularityConfirmed}
                label='Confirmo que esta conta bancária está em meu nome, registrada com meu CPF.'
              />
            </View>
          )}

          <Alert isVisible={Boolean(alert)} onBackdropPress={this.hideAlert}>
            <Alert.Title>
              {alert && alert.title}
            </Alert.Title>
            {alert && alert.description && (
              <Alert.Description>
                {alert.description}
              </Alert.Description>
            )}
            {alert && alert.buttons
              ? alert.buttons.map(button => <Alert.Button key={button.title} {...button} />)
              : <Alert.Button title='OK' onPress={this.hideAlert} />
            }
          </Alert>
        </PendencyPage>
      )
    }
}
