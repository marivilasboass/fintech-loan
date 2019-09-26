import React from 'react'

import Text from '../../Text'
import Colors from '../../Colors'

export default class ErrorAccessory extends React.Component {
  render () {
    return <Text variant='bold' color={Colors.invalid}>!</Text>
  }
}
