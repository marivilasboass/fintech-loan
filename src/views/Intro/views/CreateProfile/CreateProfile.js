import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text, Card, Colors, Row, Spacing } from '~/newUI'
import * as SvgIcons from '~/newUI/Icons'

import CreateProfileHeader from '../../components/CreateProfileHeader'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },

  container: {
    paddingHorizontal: Spacing.s6
  },

  title: {
    marginBottom: Spacing.s12
  },

  textWrap: {
    flexWrap: 'wrap',
    flex: 1
  },

  investorProfile: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.s7,
    height: 148
  },

  borrowerProfile: {
    justifyContent: 'center',
    paddingLeft: Spacing.s6 * 2,
    height: 148
  },

  borrowerProfileText: {
    marginLeft: Spacing.s10,
    alignSelf: 'center'
  },

  InvestorProfileText: {
    marginLeft: Spacing.s6,
    alignSelf: 'center'
  }
})

export default class CreateProfile extends React.PureComponent {
  chooseUserType = (userType) => {
    this.props.update({ userType })
    this.props.navigation.navigate('ProfileData')
  }

  onBack = () => {
    this.props.navigation.goBack(null)
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <CreateProfileHeader onBack={this.onBack} />
        <View style={styles.container}>
          <Text.T1 variant='heavy' color={Colors.nightRider} align='center' style={styles.title}>
            O que te trouxe aqui?
          </Text.T1>
          <Card style={styles.borrowerProfile} onPress={() => this.chooseUserType('borrower')}>
            <Row>
              <SvgIcons.Coins />
              <Text.H4 color={Colors.lightPink} style={[styles.textWrap, styles.borrowerProfileText]}>
                Preciso de um empréstimo
              </Text.H4>
            </Row>
          </Card>
          <Card style={styles.investorProfile} outerStyle={{ marginTop: Spacing.s6 }} onPress={() => this.chooseUserType('investor')}>
            <Row>
              <SvgIcons.Handshake />
              <Text.H4 color={Colors.marineBlue} style={[styles.textWrap, styles.InvestorProfileText]}>
                Quero investir meu dinheiro
              </Text.H4>
            </Row>
          </Card>
        </View>
      </View>
    )
  }
}
