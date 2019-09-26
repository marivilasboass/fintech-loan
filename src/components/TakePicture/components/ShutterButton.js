import React, { PureComponent } from 'react'
import { Svg } from 'expo'

import { Colors } from '~/newUI'

export default class ShutterButton extends PureComponent {
  render () {
    const { disabled, ...props } = this.props
    return (
      <Svg width={72} height={72} {...props}>
        <Svg.Circle
          cx={36}
          cy={36}
          r={36}
          fill={disabled ? Colors.disabled : Colors.white}
        />

        <Svg.Circle
          cx={36}
          cy={36}
          r={28}
          fill='none'
          stroke={disabled ? Colors.disabled : Colors.brightBlue}
          strokeWidth={3}
        />
      </Svg>
    )
  }
}
