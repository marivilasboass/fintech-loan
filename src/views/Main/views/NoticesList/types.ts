import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Notice } from '~/store/notices/types'


export interface NoticesListProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  markAllAsRead?: () => {}
}
export interface NotificationListProps extends NoticesListProps {
  fetchNoticesByStatus: (status: string, reset?: boolean) => Notice,
  fetchNoticesCount: () => number,
  notices: NotificationItemProps[],
  registerView: (id: string, status: string) => {},
  endReached: boolean,
  loading: boolean,
  status: string,
  resetting: boolean,
  allNoticesRead: boolean,
  screenProps: { 
    navigation: NavigationScreenProp 
  }
}

export interface NotificationItemProps extends Notice {
  sameAsPrevious: boolean, 
  onPress: () => void,
  allNoticesRead: boolean
}