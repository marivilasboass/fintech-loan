import React from 'react'
import { Dimensions } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { accountOperations } from '~/store/account'

import StorybookUI from '~/../storybook'
import { trackNavigationChange } from '~/services/trackNavigationChange'
import { downloadUpdateIfAvailable } from '~/services/updates'

import AcceptLoan from './views/AcceptLoan'
import Dashboard from './views/Dashboard'
import Investment from './views/Investment'
import Investments from './views/Investments'
import MyAccount from './views/MyAccount'
import MyLoans from './views/MyLoans'
import MyInvestments from './views/MyInvestments'
import NoticesList from './views/NoticesList'
import Pendencies from './views/Pendencies'
import RequestLoan from './views/RequestLoan'
import MyWallet from './views/MyWallet'
import LoanTutorial from './views/LoanTutorial'
import InvestmentTutorial from './views/InvestmentTutorial'
import BankSlip from './views/BankSlip'
import SideMenu from './components/SideMenu'
import MenuLabel from './components/MenuLabel'

import { environment } from '~/../config'
import AutomaticMatch from './views/AutomaticMatch'

const screenWidth = Dimensions.get('window').width
const menuWidth = screenWidth * 0.85

const MenuDrawerNavigator = DrawerNavigator({
  ...(environment === 'production' ? {} : {
    Storybook: {
      screen: StorybookUI,
      navigationOptions: {
        drawerLabel: () => <MenuLabel title='Storybook' />
      }
    }
  }),
  AutomaticMatch: {
    screen: AutomaticMatch,
    path: 'AutomaticMatch',
    navigationOptions: {
      drawerLabel: () => <MenuLabel title='Investimento automático' />
    }
  },
  Dashboard: {
    screen: Dashboard,
    path: 'Dashboard',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel title='Dashboard' />
      )
    }
  },
  Investments: {
    screen: Investments,
    path: 'Investments',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel
          title='Realizar investimento'
        />
      )
    }
  },
  RequestLoan: {
    screen: RequestLoan,
    path: 'RequestLoan',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel
          title='Solicitar empréstimo'
        />
      )
    }
  },
  MyAccount: {
    screen: MyAccount,
    path: 'MyAccount',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel
          title='Minha conta'
        />
      )
    }
  },
  MyLoans: {
    screen: MyLoans,
    path: 'MyLoans',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel title='Meus empréstimos' />
      )
    }
  },
  MyInvestments: {
    screen: MyInvestments,
    path: 'MyInvestments',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel title='Meus investimentos' />
      )
    }
  },
  Wallet: {
    screen: MyWallet,
    path: 'MyWallet',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel title='Carteira' />
      )
    }
  },
  NoticesList: {
    screen: NoticesList,
    path: 'NoticesList',
    navigationOptions: {
      drawerLabel: () => (
        <MenuLabel title='Notificações' />
      )
    }
  },

  // Screens not shown in the side menu
  MyBank: {
    screen: (props) => <MyAccount {...props} initialTab='Bank' />,
    path: 'MyBank',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  MyAddress: {
    screen: (props) => <MyAccount {...props} initialTab='Address' />,
    path: 'MyAddress',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  AcceptLoan: {
    screen: AcceptLoan,
    path: 'AcceptLoan',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Investment: {
    screen: Investment,
    path: 'Investment',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Pendencies: {
    screen: Pendencies,
    path: 'Pendencies',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  LoanTutorial: {
    screen: LoanTutorial,
    path: 'LoanTutorial',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  InvestmentTutorial: {
    screen: InvestmentTutorial,
    path: 'InvestmentTutorial',
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  BankSlip: {
    screen: BankSlip,
    path: 'BankSlip',
    navigationOptions: {
      drawerLabel: () => null
    }
  }
}, {
  initialRouteName: 'Investments',
  contentComponent: SideMenu,
  drawerWidth: menuWidth
})

const uriPrefix = Constants.linkingUri.replace(/([^+]+)\+?$/, '$1+') + '/'

const onNavigationStateChange = (fetchAccount) => (prevState, currentState) => {
  const { currentScreen } = trackNavigationChange(prevState, currentState)

  if (currentScreen === 'DrawerOpen') {
    fetchAccount()
  }

  if (currentScreen === 'Investments') {
    // We want to check for a new version when the user returns to the main screen
    downloadUpdateIfAvailable()
  }
}

class MenuNavigator extends React.PureComponent {
  render () {
    return (
      <MenuDrawerNavigator
        onNavigationStateChange={onNavigationStateChange(this.props.fetchAccount)}
        screenProps={this.props}
        uriPrefix={uriPrefix}
      />
    )
  }
}

const mapDispatchToProps = {
  fetchAccount: accountOperations.fetchAccount
}

export default connect(null, mapDispatchToProps)(MenuNavigator)
