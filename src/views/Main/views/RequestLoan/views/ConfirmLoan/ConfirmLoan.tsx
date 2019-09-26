import React from 'react'
import factory from './abTest/factory'
import { Props } from './ConfirmLoanContainer'

export default class ConfirmLoan extends React.PureComponent<Props> {
  render () {
    const { loanRequestedPage } = this.props
    const Component = factory(loanRequestedPage)
    return <Component {...this.props} />
  }
}
