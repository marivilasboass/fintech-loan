import React from 'react'
import Sentry from 'sentry-expo'
import { NavigationScreenProp } from 'react-navigation'

import { Text, Colors, View, Typography, Spacing } from '~/newUI'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import accountStatuses from '~/constants/accountStatuses'

import ErrorAlert from '../../components/ErrorAlert'
import StatusAlert from '../../components/StatusAlert'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subTitleSmall: {
    marginTop: Spacing.s2
  }
})

type Props = {
  acceptedBorrowerTermsAt: string | null,
  fetchAccount: () => { status: accountStatuses },
  navigation: NavigationScreenProp,
  screenProps: { navigation: NavigationScreenProp },
  status: accountStatuses,
  title: string,
  subTitle?: string,
  subTitleSmall?: string,
  fixedHeaderSize?: number,
  buttonTitle: string
}

export default class ConfirmLoanBase extends React.PureComponent<Props> {
  state = {
    alertState: null,
    loading: false
  }

  closeAlert = () => {
    this.setState({ alertState: null })
  }

  navigateToPage = (page: string) => {
    this.setState({ loading: false })
    this.props.navigation.navigate(page)
  }

  onAdvance = async () => {
    const { acceptedBorrowerTermsAt, fetchAccount } = this.props

    try {
      this.setState({ loading: true })
      const { status } = await fetchAccount()

      if (!acceptedBorrowerTermsAt) {
        this.navigateToPage('BorrowerTerms')
        return
      }

      if (status !== accountStatuses.approved) {
        this.navigateToPage('ToKnowYouBetter')
        return
      }

      this.navigateToPage('ConfirmPassword')
    } catch (err) {
      Sentry.captureException(err)
      this.setState({ alertState: 'error', loading: false })
    }
  }

  render () {
    const { navigation, screenProps, children, status, title, subTitle, buttonTitle, subTitleSmall, fixedHeaderSize } = this.props
    const { alertState, loading } = this.state

    return (
      <React.Fragment>
        <ErrorAlert
          isVisible={alertState === 'error'}
          onAccept={this.closeAlert}
          onRequestClose={this.closeAlert}
        />

        <StatusAlert
          isVisible={status !== accountStatuses.approved && alertState === 'status'}
          onRequestClose={this.closeAlert}
          status={status}
          navigation={screenProps.navigation}
        />

        <ViewWithHeaderAndButton backgroundType='fixed' fixedHeaderSize={fixedHeaderSize} onPressBack={() => navigation.goBack(null)}>
          <ViewWithHeaderAndButton.Header>
            <Text.T2 color={Colors.white} align='center'>{title}</Text.T2>
            {subTitle && <Text.H3 color={Colors.white} align='center'>{subTitle}</Text.H3>}
            {subTitleSmall && <Typography.T2 color={Colors.white} style={styles.subTitleSmall} align='center'>{subTitleSmall}</Typography.T2>}
          </ViewWithHeaderAndButton.Header>

          <ViewWithHeaderAndButton.Content>
            <View>
              {children}
            </View>
          </ViewWithHeaderAndButton.Content>

          <ViewWithHeaderAndButton.Button onPress={this.onAdvance} title={buttonTitle} loading={loading} />
        </ViewWithHeaderAndButton>
      </React.Fragment>
    )
  }
}
