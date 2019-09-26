import React from 'react'
import Svg, { Circle } from 'react-native-svg'

export default class DefaultMarker extends React.PureComponent {
  render () {
    return (
      <Svg width={28} height={28}>
        <Circle
          cx={63}
          cy={10}
          r={10}
          transform='translate(-49 4)'
          fill='#FFF'
          stroke='#368DF7'
          strokeWidth={7}
          fillRule='evenodd'
        />
      </Svg>
    )
  }
}
