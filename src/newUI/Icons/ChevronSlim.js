import React, { PureComponent } from 'react'
import { Svg } from 'expo'

export default class ChevronRight extends PureComponent {
  static defaultProps = {
    color: '#D7D7D7'
  }

  render () {
    const { color, style, direction, ...otherProps } = this.props
    return (
      <Svg width='7' height='10' viewBox='0 0 7 10' version='1.1' style={[{ alignSelf: 'center', transform: [{ rotate: direction === 'right' ? '180deg' : '0deg' }] }].concat(style)} {...otherProps}>
        <Svg.Polygon fill={color} id='Back-Chevron' points='0 5 4.836 0 5.75714286 0.952380952 1.84228571 5 5.75714286 9.04761905 4.836 10' />
      </Svg>
    )
  }
}
