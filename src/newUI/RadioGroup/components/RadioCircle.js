import React from 'react'

import { Svg } from 'expo'
import Colors from '../../Colors'

export default class RadioCircle extends React.PureComponent {
    static defaultProps = {
      selected: false
    }

    render () {
      const { selected } = this.props
      return (
        <Svg width={24} height={24}>
          <Svg.Circle
            fill={Colors.white}
            stroke={selected ? Colors.brightBlue : Colors.warmGray}
            strokeWidth={2}
            cx={12}
            cy={12}
            r={10}
          />
          {selected && (
            <Svg.Circle fill={Colors.brightBlue} cx={12} cy={12} r={7} />
          )}
        </Svg>
      )
    }
}
