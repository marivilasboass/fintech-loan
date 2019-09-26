import React from 'react'
import { StyleSheet, ScrollView, Linking } from 'react-native'
import Sentry from 'sentry-expo'
import { View, Colors, FixedHeader, Spacing, BottomSheet } from '~/newUI'
import MenuIndicator from '~/newUI/FixedHeader/components/MenuIndicator'
import TitledContainer from '~/components/TitledContainer'
import InfoCard from './components/InfoCard'
import TopPicture from './views/TopPicture'
import { resetNavigationTo } from '~/services/navigation'
import Address from './views/Address'
import Bank from './views/Bank'
import Email from './views/Email'
import DisableAccount from './views/DisableAccount'
import AccountTerms from './views/Terms'

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },
  container: {
    paddingHorizontal: Spacing.s6
  },
  userInfo: {
    marginTop: -52
  },
  generalInfo: {
    marginBottom: Spacing.s7
  }
})

const mutualWebsite = 'https://mutual.club/'

export default class Location extends React.PureComponent {
  state = {
    showModal: false,
    type: null,
    hasPendingBankChange: false
  }

  componentDidMount = async () => {
    const hasPendingBankChange = await this.checkForPendingBankChange()
    this.setState({ hasPendingBankChange })
  }

  handleModalVisibility = (type) => {
    const { showModal } = this.state
    this.setState({ showModal: !showModal, type })
  }

  openMenu = () => {
    this.props.navigation.navigate('DrawerOpen')
  }

  logout = async () => {
    await this.props.logout()

    const rootNavigation = this.props.screenProps.navigation
    resetNavigationTo(
      rootNavigation,
      { routePath: ['Intro'], params: {} }
    )
  }

  renderModalByType = (type) => {
    switch (type) {
    case 'address':
      return <Address />
    case 'bank':
      return <Bank hasPendingBankChange={this.state.hasPendingBankChange} />
    case 'email':
      return <Email />
    case 'generalTerms':
      return <AccountTerms type={'general'} />
    case 'investorTerms':
      return <AccountTerms type={'investor'} />
    case 'borrowerTerms':
      return <AccountTerms type={'borrower'} />
    case 'disableAccount':
      return <DisableAccount logout={this.logout} />
    default:
      break
    }
  }

  hasPendencyByType = (type) => {
    const { pendencies } = this.props
    return pendencies[type].status === 'pending'
  }

  infoSelected = (info) => {
    const { navigation } = this.props
    if (this.hasPendencyByType(info)) {
      navigation.navigate('Pendencies', { previousRoute: 'MyAccount' })
    }
    this.handleModalVisibility(info)
  }

  checkForPendingBankChange = async () => {
    try {
      const hasPendingBankChange = await this.props.fetchPendingBankChange()
      return hasPendingBankChange
    } catch (err) {
      Sentry.captureException(err)
      // Alert.alert(
      //   'Oops',
      //   'Houve um erro ao atualizar seus dados bancários. Por favor entre em contato com nossa equipe de atendimento.'
      // )
      return false
    }
  }

  render () {
    const { email, phone, bankName, remainingPendenciesCount, navigation, profilePicture } = this.props
    const { showModal, type, hasPendingBankChange } = this.state
    const hasPendency = remainingPendenciesCount > 0
    const pendencyText = hasPendency ? `${remainingPendenciesCount} pendências` : 'Sem pendências'
    return (
      <View style={styles.backgroundContainer}>
        <FixedHeader
          leftComponent={<MenuIndicator onPress={this.openMenu} />}
          centerTitle={'Minha conta'}
        />
        <ScrollView>
          <TopPicture />

          <View style={styles.container}>
            <InfoCard
              style={profilePicture && styles.userInfo}
              lines={[
                { label: 'Seu cadastro', info: pendencyText, hasPendency, onPress: hasPendency ? () => navigation.navigate('Pendencies', { previousRoute: 'MyAccount' }) : null },
                { label: 'E-mail', info: email, onPress: () => this.handleModalVisibility('email') },
                { label: 'Celular', info: phone },
                { label: 'Endereço', hasPendency: this.hasPendencyByType('address'), onPress: () => this.infoSelected('address') },
                { label: 'Conta bancária', info: bankName, hasPendency: hasPendingBankChange || this.hasPendencyByType('bank'), onPress: () => this.infoSelected('bank') }
              ]}
            />
          </View>

          <TitledContainer outerStyle={styles.generalInfo} title={'GERAL'}>
            <InfoCard
              lines={[
                { label: 'Sobre a mutual', onPress: () => Linking.openURL(mutualWebsite) },
                { label: 'Termos de uso',
                  onPressType: 'modal',
                  modalOptions: [
                    { label: 'Termos de Uso Gerais', onPress: () => this.handleModalVisibility('generalTerms') },
                    { label: 'Termos de Uso do Tomador', onPress: () => this.handleModalVisibility('borrowerTerms') },
                    { label: 'Termos de Uso do Investidor', onPress: () => this.handleModalVisibility('investorTerms') }
                  ]
                },
                { label: 'Desativar minha conta', onPress: () => this.handleModalVisibility('disableAccount') },
                { label: 'Sair', labelStyle: { color: Colors.cinnabar }, onPress: this.logout }
              ]}
            />
          </TitledContainer>
        </ScrollView>

        <BottomSheet active={showModal} onPress={this.handleModalVisibility}>
          {this.renderModalByType(type)}
        </BottomSheet>
      </View>
    )
  }
}
