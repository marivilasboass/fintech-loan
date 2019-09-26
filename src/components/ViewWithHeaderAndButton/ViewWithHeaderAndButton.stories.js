import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, Colors } from '~/newUI'
import Rates from '~/views/Main/views/RequestLoan/components/Rates'
import Summary from '../Summary'

import ViewWithHeaderAndButton from './ViewWithHeaderAndButton'

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 24
  },

  subTitle: {
    fontSize: 24
  },

  button: {
    borderRadius: 6.4,
    marginTop: 40
  },

  container: {
    shadowColor: '#e7e7e7',
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    marginBottom: 20
  },

  containerIsActive: {
    shadowColor: '#d9eaff',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 17,
    borderWidth: 2,
    borderColor: Colors.brightBlue
  },

  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },

  containerRates: {
    marginVertical: 6
  },

  totalStyle: {
    fontFamily: 'lato-heavy',
    fontSize: 20
  },

  internContainer: {
    paddingHorizontal: 18
  },

  loanValue: {
    marginVertical: 20
  },

  plots: {
    marginTop: 20,
    marginBottom: 16
  },

  padDay: {
    marginBottom: 20
  },

  totalPayable: {
    marginTop: 16,
    marginBottom: 21
  },

  lastRate: {
    marginBottom: 18
  }
})
const styles2 = StyleSheet.create({
  button: {
    borderRadius: 6.4
  },

  row: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  containerRates: {
    marginVertical: 6
  },

  internContainer: {
    paddingHorizontal: 18
  },

  loanValue: {
    marginVertical: 20
  },

  plots: {
    marginTop: 20,
    marginBottom: 16
  },

  padDay: {
    marginBottom: 20
  },

  totalPayable: {
    marginTop: 16,
    marginBottom: 21
  },

  lastRate: {
    marginBottom: 18
  }
})

storiesOf('ViewWithHeaderAndButton', module)
  .add('basic with Summary Component', () => (
    <ViewWithHeaderAndButton>
      <ViewWithHeaderAndButton.Header bold style={styles.title}>
          Escolha uma das nossas recomendações e peça seu empréstimo:
      </ViewWithHeaderAndButton.Header>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => this.activeOption()}
      >
        <Summary>
          <Summary.Card>
            <View style={[styles.row, styles.loanValue, styles.internContainer]}>
              <Text.T3>Valor do empréstimo</Text.T3>
              <View style={[styles.row]}>
                <Text.T3 variant='bold' format='currencyRounded'>{4500}</Text.T3>
                <Rates right>+ Taxas</Rates>
              </View>
            </View>
          </Summary.Card>
          <Summary.Card>
            <View style={[styles.row, styles.plots, styles.internContainer]}>
              <Text.T3>Parcelas</Text.T3>
              <Text>
                <Text.H4 color={Colors.primary}>12x</Text.H4>
                <Text.T3> de </Text.T3>
                <Text.H4 color={Colors.primary} format='currencyRounded'>4400</Text.H4>
              </Text>
            </View>
          </Summary.Card>
        </Summary>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container, styles.containerIsActive]}
        onPress={() => this.activeOption()}
      >
        <Summary>
          <Summary.Card>
            <View style={[styles.row, styles.loanValue, styles.internContainer]}>
              <Text.T3>Valor do empréstimo</Text.T3>
              <View style={[styles.row]}>
                <Text.T3 variant='bold' format='currencyRounded'>{4500}</Text.T3>
                <Rates right>+ Taxas</Rates>
              </View>
            </View>
          </Summary.Card>
          <Summary.Card>
            <View style={[styles.row, styles.plots, styles.internContainer]}>
              <Text.T3>Parcelas</Text.T3>
              <Text>
                <Text.H4 color={Colors.primary}>12x</Text.H4>
                <Text.T3> de </Text.T3>
                <Text.H4 color={Colors.primary} format='currencyRounded'>4400</Text.H4>
              </Text>
            </View>
          </Summary.Card>
        </Summary>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => this.activeOption()}
      >
        <Summary>
          <Summary.Card>
            <View style={[styles.row, styles.loanValue, styles.internContainer]}>
              <Text.T3>Valor do empréstimo</Text.T3>
              <View style={[styles.row]}>
                <Text.T3 variant='bold' format='currencyRounded'>{4500}</Text.T3>
                <Rates right>+ Taxas</Rates>
              </View>
            </View>
          </Summary.Card>
          <Summary.Card>
            <View style={[styles.row, styles.plots, styles.internContainer]}>
              <Text.T3>Parcelas</Text.T3>
              <Text>
                <Text.H4 color={Colors.primary}>12x</Text.H4>
                <Text.T3> de </Text.T3>
                <Text.H4 color={Colors.primary} format='currencyRounded'>4400</Text.H4>
              </Text>
            </View>
          </Summary.Card>
        </Summary>
      </TouchableOpacity>
      <ViewWithHeaderAndButton.Button title='Confirmar' style={styles.button} />
    </ViewWithHeaderAndButton>
  ))
  .add('gradient with Summary Component', () => (
    <ViewWithHeaderAndButton backgroundType='header'>
      <ViewWithHeaderAndButton.Header>
        <Text.T2 color={Colors.white} align='center'>Tudo certo, Leonado!</Text.T2>{'\n'}
        <Text.H3 color={Colors.white} align='center'>Você já pode finalizar seu pedido.</Text.H3>
      </ViewWithHeaderAndButton.Header>
      <View style={styles2.content}>
        <Summary>
          <Summary.Card>
            <View style={[styles2.row, styles2.loanValue, styles2.internContainer]}>
              <Text.H5>Valor do empréstimo</Text.H5>
              <Text.H5 format='currencyRounded'>{4500}</Text.H5>
            </View>
            <View style={[styles2.row, styles2.containerRates, styles2.internContainer]}>
              <Rates>+ Juros</Rates>
              <View style={styles2.row}>
                <Text format='percentage'>{4.6}</Text>
                <Text>a.m.</Text>
              </View>
            </View>
            <View style={[styles2.row, styles2.containerRates, styles2.internContainer]}>
              <Rates>+ IOF</Rates>
              <Text format='currency'>{43.56}</Text>
            </View>
            <View style={[styles2.row, styles2.containerRates, styles2.lastRate, styles2.internContainer]}>
              <Rates>+ CET</Rates>
              <View style={styles2.row}>
                <Text format='percentage'>{6.76}</Text>
                <Text>a.m.</Text>
              </View>
            </View>
          </Summary.Card>
          <Summary.Card>
            <View style={[styles2.row, styles2.plots, styles2.internContainer]}>
              <Text.H5>Parcelas</Text.H5>
              <Text.T3>
                <Text.T3 variant='bold' color={Colors.primary}>{12}x</Text.T3> de <Text.T3 format='currencyRounded' variant='bold' color={Colors.primary}>4400</Text.T3>
              </Text.T3>
            </View>
            <View style={[styles2.row, styles2.padDay, styles2.internContainer]}>
              <Text.H5>Vencimento</Text.H5>
              <Text>dia {15} de cada mês</Text>
            </View>
          </Summary.Card>
          <Summary.Card>
            <View style={[styles2.row, styles2.totalPayable, styles2.internContainer]}>
              <Text.H5>Total a pagar</Text.H5>
              <Text.T2 variant='heavy' color={Colors.primary} format='currencyRounded'>55000</Text.T2>
            </View>
          </Summary.Card>
        </Summary>
      </View>
      <ViewWithHeaderAndButton.Button style={styles2.button} large bold title='Confirmar' />
    </ViewWithHeaderAndButton>
  ))
