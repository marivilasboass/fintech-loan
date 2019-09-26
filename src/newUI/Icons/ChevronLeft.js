import React, { PureComponent } from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class ChevronLeft extends PureComponent {
    static defaultProps = {
      color: Colors.white
    }
    render () {
      const { color, ...props } = this.props
      return (
        <Svg width={12} height={20} {...props}>
          <Svg.Polygon fill={color} points='0,9.6 10.08,0 12,1.8285714 3.84,9.6 12,17.3714286 10.08,19.2' />
        </Svg>
      )
    }
}
