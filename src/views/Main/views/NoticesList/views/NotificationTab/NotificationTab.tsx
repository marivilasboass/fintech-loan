import React from 'react'

import { TabNavigator } from '~/newUI'
import NotificationList from '../NotificationList'
import NotReadNotificationList from '../NotificationList/NotReadListContainer'
import { NoticesListProps } from '../../types'

const ListTabs = TabNavigator({
  All: {
    navigationOptions: ({ navigation, screenProps }) => {
      return ({
        title: 'Todas',
        tabBarOnPress: ({ jumpToIndex, scene }) => {
          screenProps.fetchNoticesByStatus('total', true)
          screenProps.fetchNoticesCount()
          navigation.state.params && navigation.state.params.onTabFocus()
          jumpToIndex(scene.index)
        }
      })
    },
    screen: (props) => (
      <NotificationList status={'total'} {...props} />
    )
  },
  NotRead: {
    navigationOptions: ({ navigation, screenProps }) => {
      return ({
        title: `Não lidas (${screenProps.notReadCount})`,
        tabBarOnPress: ({ jumpToIndex, scene }) => {
          screenProps.fetchNoticesByStatus('unread', true)
          screenProps.fetchNoticesCount()
          navigation.state.params && navigation.state.params.onTabFocus()
          jumpToIndex(scene.index)
        }
      })
    },
    screen: (props) => {
      return <NotReadNotificationList status={'unread'} {...props} />
    }
  }
}, {
  initialRouteName: 'All',
  swipeEnabled: false
})

export default class NotificationTab extends React.PureComponent<NoticesListProps> {
  render () {
    return (
      <ListTabs screenProps={this.props} />
    )
  }
}
