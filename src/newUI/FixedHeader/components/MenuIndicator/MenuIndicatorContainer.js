import React from 'react'
import { connect } from 'react-redux'

import { noticesSelectors } from '~/store/notices'

import MenuIndicator from './MenuIndicator'

class MenuIndicatorContainer extends React.PureComponent {
  render () {
    return (<MenuIndicator {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  count: noticesSelectors.getQtyNoticesNotRead(state)
})

export default connect(mapStateToProps)(MenuIndicatorContainer)
