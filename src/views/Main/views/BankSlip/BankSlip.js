import React from 'react'
import { View, StyleSheet, Clipboard, Linking, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'

import { Colors, Text, Icon, Spacing, Shadow, FinanceText, Button } from '~/newUI'
import share from '~/services/share'
import { track } from '~/services/analytics'
import BankSlipHeader from './components/BankSlipHeader'

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.s6,
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Spacing.s6
  },

  content: {
    flexGrow: 1
  },

  icon: {
    alignSelf: 'flex-end',
    marginTop: Spacing.s5
  },

  title: {
    marginTop: Spacing.s5,
    marginBottom: Spacing.s3
  },

  box: {
    paddingVertical: Spacing.s4,
    alignItems: 'center'
  },

  shadowBox: {
    marginTop: Spacing.s10
  },

  numberBox: {
    marginTop: Spacing.s5,
    paddingTop: Spacing.s3,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray
  },

  number: {
    paddingHorizontal: Spacing.s10
  },

  buttons: {
    justifyContent: 'flex-start',
    borderRadius: 27,
    paddingLeft: Spacing.s9
  },

  icons: {
    marginRight: 20
  },

  links: {
    borderColor: Colors.brightBlue,
    borderWidth: 2,
    height: Spacing.s13
  },

  middleButton: {
    marginVertical: Spacing.s3
  }
})

export default class BankSlip extends React.PureComponent {
  state ={
    active: false
  }

  share = (url) => {
    const title = 'Estou compartilhando com você o boleto da Mutual.'
    const message = url
    share(title, message)
    track('ShareBoleto')
  }

  copyToClipboard = (code) => {
    Clipboard.setString(code)
    this.setState({ active: true })

    setTimeout(() => this.setState({ active: false }), 2000)
    track('CopyBoleto')
  }

  viewOnBrowser = url => Linking.openURL(url)

  render () {
    const { navigation } = this.props
    const { value, code, url, dueDate, backUrl } = navigation.state.params.boleto
    return (
      <React.Fragment>
        <BankSlipHeader onBack={this.props.navigation} active={this.state.active} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.wrapper}>
            <View>
              <TouchableWithoutFeedback onPress={() => backUrl ? navigation.navigate(backUrl) : navigation.goBack()}>
                <Icon name='close' color={Colors.brightBlue} style={styles.icon} size={30} />
              </TouchableWithoutFeedback>
              <Text.H3 align='center' color={Colors.nightRider} style={styles.title}>Boleto bancário</Text.H3>
              <Text.T3 align='center' color={Colors.nightRider}>
                Utilize o número do código de barras abaixo para realizar o seu depósito:
              </Text.T3>
              <Shadow layout='auto' radius={6} color={Colors.black} opacity={0.07} outerStyle={styles.shadowBox}>
                <View style={styles.box}>
                  <FinanceText
                    color={Colors.lightPink}
                    currencyProps={{ fontSize: 24 }}
                    cashProps={{ variant: 'heavy', fontSize: 24 }}
                    children={value}
                  />
                  <Text.T3 color={Colors.warmGray}>Vencimento em {dueDate}</Text.T3>
                  <TouchableOpacity activeOpacity={0.6} onPress={() => this.copyToClipboard(code)}>
                    <View style={styles.numberBox}>
                      <Text.T2 color={Colors.nightRider} align='center' style={styles.number}>{code}</Text.T2>
                    </View>
                  </TouchableOpacity>
                </View>
              </Shadow>
            </View>
            <View>
              <Button
                secondary small title='Copiar código de barras' style={styles.buttons}
                iconLeft={{ name: 'Copy', style: styles.icons, type: 'svg' }}
                onPress={() => this.copyToClipboard(code)}
              />
              <Button
                secondary small link title='Compartilhar boleto' style={[styles.buttons, styles.links, styles.middleButton]}
                iconLeft={{ name: 'Share', style: styles.icons, type: 'svg' }}
                onPress={() => this.share(url)}
              />
              <Button
                secondary small link title='Abrir boleto no navegador' style={[styles.buttons, styles.links]}
                iconLeft={{ name: 'OpenWeb', style: styles.icons, type: 'svg' }}
                onPress={() => this.viewOnBrowser(url)}
              />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }
}
