import React, { PureComponent } from 'react'
import { Svg } from 'expo'

export default class ChevronRight extends PureComponent {
    static defaultProps = {
      color: '#CACBCC'
    }
    render () {
      const { color, style, ...otherProps } = this.props
      return (
        <Svg width={8} height={13} viewBox='0 0 8 13' style={[{ marginLeft: 14, alignSelf: 'center' }].concat(style)} {...otherProps}>
          <Svg.Polygon fill={color} rotation={-180} origin='4, 6.5' points='0,6.5 6.72,0 8,1.238095 2.56,6.5 8,11.761905 6.72,13' />
        </Svg>
      )
    }
}
