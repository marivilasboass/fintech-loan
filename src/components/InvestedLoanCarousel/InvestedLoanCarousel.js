import React from 'react'
import LoanCardHeader from '../LoanCardHeader'
import { Colors } from '~/newUI'
import CarouselCard from '../CarouselCard'
import format from '~/services/format'
import moment from 'moment'
import R from 'ramda'

const DAYS_TO_EXPIRE = 10

export default class InvestedLoanCarousel extends React.PureComponent {
  addDays = (date, days) => {
    return moment(date).add(days, 'days').toDate()
  }

  orderByExpirationTime = (loans) => {
    const byDate = R.descend(R.prop('createdAt'))
    return R.sort(byDate, loans)
  }

  renderItem = (item, index) => {
    const { financedAmount, score } = item
    const scoreColor = Colors[`score${score}`]
    const value = format('newCurrency', financedAmount)
    const expiresAt = this.addDays(item.publishedAt || item.createdAt, DAYS_TO_EXPIRE)
    const daysLeftToExpire = moment(expiresAt).fromNow(true)
    return (
      <LoanCardHeader
        title={`R$ ${value}`}
        titleColor={scoreColor}
        description={`Expira em ${daysLeftToExpire}`}
        {...item}
        showTag
      />
    )
  }
  render () {
    const { data: loans } = this.props
    const orderedLoans = this.orderByExpirationTime(loans)
    return (
      <CarouselCard data={orderedLoans} showContent={this.renderItem} {...this.props} />
    )
  }
}
