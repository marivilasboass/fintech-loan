import React from 'react'

import Text from '../../Text'

export default class AlertDescription extends React.PureComponent {
  render () {
    return <Text.T3 align='center' {...this.props} />
  }
}
