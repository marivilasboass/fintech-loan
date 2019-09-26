import React from 'react'
import { View, StyleSheet } from 'react-native'
import R from 'ramda'

import { Input, Spacing } from '~/newUI'
import { validateBank } from '~/utils/validateBank'
import BankCardImage from '~/components/BankCardImage'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputsContainer: {
    marginTop: Spacing.s7,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  digitInput: {
    flex: 0.5,
    marginRight: Spacing.s6
  },
  accountInput: {
    flex: 1,
    marginRight: Spacing.s6
  }
})

// splits {agency, account} into {operation, account, accountDigit, agency, agencyDigit}
const parseBankData = ({ bank, agency, account }) => {
  let operation
  let parsedAccount = account
  let accountDigit

  if (bank.accountOperationLength > 0) {
    [operation, parsedAccount] = R.splitAt(3, parsedAccount)
  }

  // eslint-disable-next-line prefer-const
  [parsedAccount, accountDigit] = R.splitAt(-1, parsedAccount)

  let parsedAgency = agency
  let agencyDigit
  if (bank.agencyDigit) {
    [parsedAgency, agencyDigit] = R.splitAt(-1, parsedAgency)
  }

  const data = {
    operation,
    account: parsedAccount,
    accountDigit,
    agency: parsedAgency,
    agencyDigit
  }

  const safeData = R.map(R.defaultTo(''), data)

  return safeData
}

export default class AccountInputs extends React.PureComponent {
  static defaultProps = {
    agency: '',
    account: ''
  }

  constructor (props) {
    super(props)

    const bankData = parseBankData(props)

    this.state = {
      ...bankData
    }
  }

  componentWillReceiveProps (newProps) {
    const getBankCode = R.path(['bank', 'code'])
    // if bank changed clear state
    if (getBankCode(newProps) !== getBankCode(this.props)) {
      this.clearState()
    }
  }

  clearState = () => {
    this.setState({
      operation: '',
      account: '',
      accountDigit: '',
      agency: '',
      agencyDigit: ''
    })
  }

  onChange = (change) => {
    const newState = { ...change }

    if (newState.accountDigit) {
      newState.accountDigit = newState.accountDigit.toUpperCase()
    }

    const bankData = { ...this.state, ...newState }
    const code = this.props.bank.code
    this.setState(newState)

    const { operation, agency, agencyDigit, account, accountDigit } = bankData

    const validation = validateBank({
      code,
      branchNumber: agency,
      branchDigit: agencyDigit,
      operation,
      accountNumber: account,
      accountDigit
    })
    const accountNumber = validation.paddedAccountNumber || account

    const mergedAgency = `${agency}${agencyDigit}`
    const mergedAccount = `${operation}${accountNumber}${accountDigit}`

    if (validation.paddedAccountNumber) {
      this.setState({ account: validation.paddedAccountNumber })
    }

    this.props.onChange({
      agency: mergedAgency,
      account: mergedAccount,
      ...validation
    })
  }

  onAgencyDigitExactLength = bank => () => {
    bank.accountOperationLength
      ? (this.operationInputRef && this.operationInputRef.focus())
      : (this.accountInputRef && this.accountInputRef.focus())
  }

  onAgencyExactLength = bank => () => {
    bank.agencyDigit
      ? (this.agencyDigitInputRef && this.agencyDigitInputRef.focus())
      : bank.accountOperationLength
        ? (this.operationInputRef && this.operationInputRef.focus())
        : (this.accountInputRef && this.accountInputRef.focus())
  }

  render () {
    const { style, bank } = this.props
    const { operation, agency, agencyDigit, account, accountDigit } = this.state

    return (
      <View style={[styles.container, style]}>
        <BankCardImage bankShortName={bank.shortName} />

        <View style={styles.inputsContainer}>

          <Input
            label='Agência'
            value={agency}
            placeholder={bank.agencyExample}
            keyboardType='numeric'
            onChange={agency => this.onChange({ agency })}
            exactLength={bank.agencyLength}
            onExactLength={this.onAgencyExactLength(bank)}
            style={styles.accountInput}
          />

          {bank.agencyDigit && (
            <Input
              label='Dígito'
              value={agencyDigit}
              placeholder={bank.agencyDigitExample}
              onChange={agencyDigit => this.onChange({ agencyDigit })}
              exactLength={1}
              ref={ref => { this.agencyDigitInputRef = ref }}
              onExactLength={this.onAgencyDigitExactLength(bank)}
              style={styles.digitInput}
            />
          )}

          {bank.accountOperationLength && (
            <Input
              label='Operação'
              value={operation}
              placeholder={bank.accountOperationExample}
              keyboardType='numeric'
              onChange={operation => this.onChange({ operation })}
              exactLength={bank.accountOperationLength}
              ref={ref => { this.operationInputRef = ref }}
              onExactLength={() => this.accountInputRef && this.accountInputRef.focus()}
              style={styles.accountInput}
            />
          )}

          <Input
            label='Conta'
            value={account}
            placeholder={bank.accountExample}
            keyboardType='numeric'
            onChange={account => this.onChange({ account })}
            exactLength={bank.accountLength}
            ref={ref => { this.accountInputRef = ref }}
            onExactLength={() => this.accountDigitInputRef && this.accountDigitInputRef.focus()}
            style={styles.accountInput}
          />

          <Input
            label='Dígito'
            value={accountDigit}
            placeholder={bank.accountDigitExample}
            onChange={accountDigit => this.onChange({ accountDigit })}
            exactLength={1}
            ref={ref => { this.accountDigitInputRef = ref }}
            style={styles.digitInput}
          />
        </View>
      </View>
    )
  }
}
