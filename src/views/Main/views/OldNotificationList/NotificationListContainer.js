import React from 'react'
import { connect } from 'react-redux'

import { noticesSelectors, noticesOperations } from '~/store/notices'

import NotificationList from './NotificationList'

class NotificationListContainer extends React.PureComponent {
  render () {
    return (<NotificationList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  notices: noticesSelectors.getNoticesList(state),
  loading: noticesSelectors.getLoading(state),
  resetting: noticesSelectors.getResetting(state),
  endReached: noticesSelectors.getEndReached(state)
})

const mapDispatchToProps = {
  fetchNotices: noticesOperations.fetch,
  fetchNoticesCount: noticesOperations.fetchNoticesCount,
  registerView: noticesOperations.registerView
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer)
