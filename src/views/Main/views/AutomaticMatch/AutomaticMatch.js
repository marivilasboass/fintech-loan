import React from 'react'

import Wizard from './components/Wizard'

export default class AutomaticMatch extends React.PureComponent {
  render () {
    return (
      <Wizard {...this.props} />
    )
  }
}
