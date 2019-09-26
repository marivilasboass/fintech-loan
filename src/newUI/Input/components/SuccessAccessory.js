import React from 'react'

import Colors from '../../Colors'
import Icon from '../../Icon'

export default class SuccessAccessory extends React.Component {
  render () {
    return <Icon type='material-community' name='check' color={Colors.secondary} />
  }
}
