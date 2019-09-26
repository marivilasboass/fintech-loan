import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import R from 'ramda'
import { BottomSheet, View, Spacing, FixedHeader, Colors } from '~/newUI'
import MenuIndicator from '~/newUI/FixedHeader/components/MenuIndicator'
import FilterIndicator from '~/newUI/FixedHeader/components/FilterIndicator'
import ApprovedAlert from '~/components/Alerts/ApprovedAlert'
import { track } from '~/services/analytics'
import Filter from '~/components/AdvancedFilter'
import FlatLoans from './components/FlatLoans'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  bottomSheetContainer: {
    height: Dimensions.get('window').height - Spacing.s15
  }
})

export default class Investments extends React.PureComponent {
  state = {
    modalVisible: false,
    approvedAlertIsVisible: false,
    currentFilters: this.props.filters
  }

  redirectUser = () => {
    const { borrowerRedirect, navigation, userType, hasActiveLoan, acceptedBorrowerTermsAt, status, update } = this.props

    if (borrowerRedirect) {
      navigation.navigate('LoanTutorial')

      update({ borrowerRedirect: false })
      return
    }

    if (status === 'pendingData' && userType === 'borrower' && !hasActiveLoan && !acceptedBorrowerTermsAt) {
      navigation.navigate('RequestLoan')

      return
    }

    if (status !== 'approved' && userType === 'borrower' && !!acceptedBorrowerTermsAt) {
      navigation.navigate('Pendencies')
    }
  }

  componentDidMount = async () => {
    const { daysSinceRegistration, fetchBanner, fetchNoticesCount } = this.props

    fetchBanner()

    fetchNoticesCount()

    if (daysSinceRegistration <= 5) {
      this.redirectUser()
      return
    }

    this.showApprovedAlertIfNecessary()
  }

  showApprovedAlertIfNecessary = () => {
    const { status, shownApprovedAlert, update } = this.props

    const approvedAlertIsVisible = status === 'approved' && shownApprovedAlert === false

    if (approvedAlertIsVisible) {
      track('ApprovalShown')

      update({ shownApprovedAlert: true })
      this.setState({ approvedAlertIsVisible })
    }
  }

  handleApplyFilter = () => {
    const { filters } = this.props
    const { currentFilters } = this.state
    if (!R.equals(currentFilters, filters)) {
      this.props.startPagination()
      this.setState({ currentFilters: filters })
    }
    this.setState({ modalVisible: false })
  }

  handleCloseFilter = () => {
    const { updateFilters } = this.props
    const { currentFilters } = this.state
    updateFilters(currentFilters)
    this.setState({ modalVisible: false })
  }

  openMenu = () => {
    this.props.navigation.navigate('DrawerOpen')
  }

  openFilterModal = () => {
    this.setState({ modalVisible: true })
  }

  render () {
    const { userType } = this.props
    const { modalVisible, approvedAlertIsVisible } = this.state

    return (
      <React.Fragment>
        <ApprovedAlert
          isVisible={approvedAlertIsVisible}
          isInvestor={userType === 'investor'}
          onRequestClose={() => this.setState({ approvedAlertIsVisible: false })}
        />
        <FixedHeader
          leftComponent={<MenuIndicator onPress={this.openMenu} />}
          rightComponent={<FilterIndicator onPress={this.openFilterModal} />}
          centerTitle={'Marketplace'}
          shadowColor={Colors.white}
        />
        <View style={styles.container}>
          <FlatLoans {...this.props} />
        </View>
        <BottomSheet active={modalVisible} onPress={this.handleCloseFilter}>
          <View style={styles.bottomSheetContainer}>
            <Filter onClose={this.handleApplyFilter} />
          </View>
        </BottomSheet>
      </React.Fragment>
    )
  }
}
