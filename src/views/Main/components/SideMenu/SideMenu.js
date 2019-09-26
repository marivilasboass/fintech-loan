import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import { DrawerItems } from 'react-navigation'

import { ScrollView, Touch } from '~/UI'
import R from 'ramda'
import HeaderMenu from './components/HeaderMenu'
import Version from './components/Version'
import MenuLabel from '../MenuLabel'
import { investorWithInvestment, investorWithoutInvestment,
  borrowerWithLoan, borrowerWithoutLoan } from '../MenuScreens/MenuScreens'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  drawerWrapper: {
    flex: 1
  },
  scrollviewContainer: {
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'space-between'
  }
})

const supportUrl = 'https://mutual.zendesk.com/hc/pt-br'

const sortArray = (items, orderArray) => items.slice().sort((a, b) => {
  return orderArray.indexOf(a.key) - orderArray.indexOf(b.key)
})

const filterMenuItemsForInvestor = (items, orderArray, featureFlags) => {
  const { enableDashboard, enableSemiAutomaticMatch } = featureFlags
  const filteredItems = items.filter(item => {
    if (item.key === 'Dashboard' && !enableDashboard) {
      return
    }
    if (item.key === 'AutomaticMatch' && !enableSemiAutomaticMatch) {
      return
    }
    return R.contains(item.key, orderArray)
  })
  return sortArray(filteredItems, orderArray)
}

const filterMenuItemsForBorrower = (items, orderArray, featureFlags) => {
  const filteredItems = items.filter(item => {
    return R.contains(item.key, orderArray)
  })
  return sortArray(filteredItems, orderArray)
}

const getMenuItemsOrder = (props) => {
  const { items, activeMenuType, flags, featureFlags, isPJ } = props
  if (activeMenuType === 'investor' || isPJ) {
    if (flags.hasInvestment) {
      return filterMenuItemsForInvestor(items, investorWithInvestment, featureFlags)
    }
    return filterMenuItemsForInvestor(items, investorWithoutInvestment, featureFlags)
  }
  if (flags.hasActiveLoan) {
    return filterMenuItemsForBorrower(items, borrowerWithLoan, featureFlags)
  }
  return filterMenuItemsForBorrower(items, borrowerWithoutLoan, featureFlags)
}

export default class SideMenu extends React.PureComponent {
  render () {
    const { navigation, noticesNotRead } = this.props
    const menuItemOrder = getMenuItemsOrder(this.props)
    return (
      <View style={styles.container}>
        <HeaderMenu navigation={navigation} />

        <View style={styles.drawerWrapper}>
          <ScrollView contentContainerStyle={styles.scrollviewContainer}>
            <View>
              <Touch onPress={() => navigation.navigate('NoticesList')}>
                <View>
                  <MenuLabel title='Notificações' notices={noticesNotRead} />
                </View>
              </Touch>
              <DrawerItems {...this.props} items={menuItemOrder} />
              <Touch onPress={() => Linking.openURL(supportUrl)}>
                <View>
                  <MenuLabel title='Atendimento' screen={'Atendimento'} />
                </View>
              </Touch>
            </View>
            <Version />
          </ScrollView>
        </View>
      </View>
    )
  }
}
