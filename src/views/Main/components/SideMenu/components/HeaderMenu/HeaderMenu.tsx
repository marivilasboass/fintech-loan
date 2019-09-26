import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Constants } from 'expo'
import { Avatar } from '~/UI'
import { Colors, Touch, Switcher } from '~/newUI'
import UserInfo from './components/UserInfo'
import { NavigationScreenProp } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mutualBlue
  },
  header: {
    flexDirection: 'row'
  },
  walletContainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    margin: 20,
    padding: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.menuAvatar,
    backgroundColor: Colors.menuAvatar
  },
  avatarOverlay: {
    borderColor: Colors.mutualBlue
  },
  switcher: {
    marginBottom: 40,
    marginHorizontal: 20
  }
})

type Props = {
  userType: string,
  update: (value: any) => void,
  navigation: NavigationScreenProp,
  profilePicture: string,
  isPJ: boolean
}

const userTypeSwitcher = { left: { label: 'Investidor', value: 'investor' }, right: { label: 'Tomador', value: 'borrower' } }
export default class HeaderMenu extends React.PureComponent<Props> {
  state = {
    activeMenuType: this.props.userType
  }

  changeActiveMenuType = ({ value }) => {
    this.setState({ activeMenuType: value })
    this.props.update({ activeMenuType: value })
  }

  navigateToMyAccount = () => {
    this.props.navigation.navigate('MyAccount')
  }

  render () {
    const { profilePicture, isPJ, navigation } = this.props
    const { activeMenuType } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.walletContainer}>
            <Touch onPress={this.navigateToMyAccount}>
              <View style={styles.avatar}>
                <Avatar picture={profilePicture} style={styles.avatarOverlay} />
              </View>
            </Touch>
            <UserInfo navigation={navigation} />
          </View>
        </View>
        {!isPJ && (
          <Switcher
            style={styles.switcher}
            {...userTypeSwitcher}
            value={activeMenuType}
            onChange={this.changeActiveMenuType}
            selectedColor={Colors.primary}
            backgroundColor={Colors.menuAvatar}
            borderColor={Colors.menuAvatar}
            hideShadow
            shadowColor={Colors.marineBlue}
          />
        )}
      </View>
    )
  }
}
