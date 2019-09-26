import React from 'react'
import { StyleSheet, View } from 'react-native'
import R from 'ramda'
import moment from 'moment'
import Sentry from 'sentry-expo'

import { Text, Colors, ScrollView, Loader } from '~/UI'
import { api } from '~/services/api'
import Installment, { styles as rowStyles } from './components/Installment'

const sortByDueDate = R.sort(R.comparator((a, b) => a.dueDate < b.dueDate))

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  boletoContainer: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.border
  }
})

export default class Installments extends React.Component {
  state = {
    installments: [],
    invoices: {},
    openInvoice: null,
    loading: false
  }

  componentDidMount () {
    this.fetchLoanInstallments()
  }

  fetchLoanInstallments = async () => {
    const { loan } = this.props.screenProps.navigation.state.params

    if (loan.analysisStatus !== 'approved') {
      return
    }

    const installmentsUrl = `collection/negotiations/${loan.activeNegotiationId}/installments`

    this.setState({ loading: true })
    try {
      const { data: result } = await api.get(installmentsUrl)

      const installments = sortByDueDate(result.data)
      this.setState({ installments, loading: false })
    } catch (err) {
      Sentry.captureException(err)
      this.setState({ loading: false })
    }
  }

  navigateToViewInvoice = (invoice) => {
    const boleto = {
      value: invoice.totalAmountCents / 100,
      url: invoice.url,
      code: invoice.code,
      dueDate: moment(invoice.dueDate).format('D MMM').toUpperCase()
    }

    this.props.screenProps.screenProps.navigation.navigate('BankSlip', { boleto })
  }

  selectInvoice = installment => async () => {
    const installmentId = installment._id
    this.setState(previousState => ({
      openInvoice: previousState.openInvoice !== installmentId ? installmentId : null
    }))

    if (!this.state.invoices[installmentId] && installment.status !== 'legalCollection') {
      try {
        const { data: result } = await api.get(`iugu/installment/${installmentId}/activeInvoice`)

        this.setState(prevState => ({
          invoices: {
            ...prevState.invoices,
            [installmentId]: result.data
          }
        }))
      } catch (err) {
        Sentry.captureException(err)
      }
    }
  }

  render () {
    const { installments, loading, invoices, openInvoice } = this.state
    const { accountId, screenProps } = this.props
    const { loan } = screenProps.navigation.state.params
    const { borrower, marketplaceStatus } = loan

    if (loading) {
      return <Loader.FullScreen />
    }

    if (marketplaceStatus !== 'invested') {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={rowStyles.element}>
            <Text bold>Este empréstimo não possui parcelas</Text>
          </View>
        </ScrollView>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.boletoContainer}>
          <View style={[rowStyles.element, rowStyles.rowElement]}>
            <View style={rowStyles.col1} />
            <Text bold style={rowStyles.col2}>Parcela</Text>
            <Text bold style={rowStyles.col3}>Valor</Text>
            <Text bold style={rowStyles.col4}>Venc.</Text>
            <View style={rowStyles.col5} />
          </View>
          {installments.map((installment, i) => (
            <Installment key={installment._id} i={i}
              invoice={invoices[installment._id]}
              installment={installment}
              totalInstallments={installments.length}
              isBorrower={borrower._id === accountId}
              open={openInvoice !== installment._id}
              selectInvoice={this.selectInvoice}
              navigateToViewInvoice={this.navigateToViewInvoice}
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}
