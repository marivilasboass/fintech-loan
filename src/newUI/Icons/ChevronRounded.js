
import React, { PureComponent } from 'react'
import { Svg } from 'expo'

export default class ChevronRounded extends PureComponent {
  static defaultProps = {
    color: '#CACBCC',
    direction: 'right'
  }
  render () {
    const { color, style } = this.props
    return (
      <Svg width={6} height={10} style={[{ alignSelf: 'center' }].concat(style)}>
        <Svg.Path
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeLineJoin='round'
          strokeWidth={2}
          opacity='.25'
          d='M1.283 1.308L4.975 5 1.283 8.692'
        />
      </Svg>
    )
  }
}
