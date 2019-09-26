import React from 'react'
import { connect } from 'react-redux'

import { paginatedLoansOperations, paginatedLoansSelectors } from '~/store/paginatedLoans'
import { accountOperations, accountSelectors } from '~/store/account'
import { noticesOperations, noticesSelectors } from '~/store/notices'

import Investments from './Investments'

class InvestmentsContainer extends React.PureComponent {
  render () {
    return (<Investments {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  hasFiltered: paginatedLoansSelectors.getHasFiltered(state),
  pageNumber: paginatedLoansSelectors.getPageNumber(state),
  currentPage: paginatedLoansSelectors.getCurrentPage(state),
  loans: paginatedLoansSelectors.getFullLoans(state),
  loading: paginatedLoansSelectors.getLoading(state),
  listView: paginatedLoansSelectors.getListView(state),
  filters: paginatedLoansSelectors.getFilters(state),
  pageSize: paginatedLoansSelectors.getPageSize(state),
  endReached: paginatedLoansSelectors.getEndReached(state),
  currentIndexFlatLoan: paginatedLoansSelectors.getCurrentIndexFlatLoan(state),
  borrowerRedirect: accountSelectors.getAccount(state).borrowerRedirect,
  acceptedBorrowerTermsAt: accountSelectors.getAcceptedBorrowerTermsAt(state),
  status: accountSelectors.getStatus(state),
  hasActiveLoan: accountSelectors.getFlags(state).hasActiveLoan,
  userType: accountSelectors.getUserType(state),
  shownApprovedAlert: accountSelectors.getAccount(state).shownApprovedAlert,
  daysSinceRegistration: accountSelectors.getDaysSinceRegistration(state),
  banner: noticesSelectors.getBanner(state)
})

const mapDispatchToProps = {
  startPagination: paginatedLoansOperations.startPagination,
  fetchNextPage: paginatedLoansOperations.fetchNextPage,
  clear: paginatedLoansOperations.clear,
  setCurrentIndexFlatLoans: paginatedLoansOperations.setCurrentIndexFlatLoans,
  update: accountOperations.update,
  sendBannerPressedEvent: noticesOperations.sendBannerPressedEvent,
  fetchBanner: noticesOperations.fetchBanner,
  fetchNoticesCount: noticesOperations.fetchNoticesCount,
  updateFilters: paginatedLoansOperations.updateFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentsContainer)
