import React from 'react'
import { connect } from 'react-redux'
import { noticesOperations, noticesSelectors } from '~/store/notices'
import NoticesList from './NoticesList'

class NoticesListContainer extends React.PureComponent {
  render () {
    return (<NoticesList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  notReadCount: noticesSelectors.getQtyNoticesNotRead(state)
})

const mapDispatchToProps = {
  markAllAsRead: noticesOperations.markAllAsRead,
  fetchNoticesCount: noticesOperations.fetchNoticesCount,
  fetchNoticesByStatus: noticesOperations.fetchNoticesByStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesListContainer)
