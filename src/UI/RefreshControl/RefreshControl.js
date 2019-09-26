import React from 'react'
import { RefreshControl as RNRefreshControl } from 'react-native'

import Colors from '../Colors'

export default class RefreshControl extends React.PureComponent {
  render () {
    return (
      <RNRefreshControl
        colors={[Colors.primary]}
        {...this.props}
      />
    )
  }
}
