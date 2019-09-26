import React from 'react'
import { connect } from 'react-redux'
import { noticesSelectors, noticesOperations } from '~/store/notices'
import NotificationList from './NotificationList'

class NotReadListContainer extends React.PureComponent {
  render () {
    return (<NotificationList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  notices: noticesSelectors.getNoticesList(state, 'unread'),
  loading: noticesSelectors.getLoading(state),
  resetting: noticesSelectors.getResetting(state),
  endReached: noticesSelectors.getEndReached(state, 'unread'),
  allNoticesRead: noticesSelectors.getAllNoticesRead(state)
})

const mapDispatchToProps = {
  fetchNoticesByStatus: noticesOperations.fetchNoticesByStatus,
  registerView: noticesOperations.registerView
}

export default connect(mapStateToProps, mapDispatchToProps)(NotReadListContainer)
