import React, { PureComponent } from 'react'
import { Svg } from 'expo'

export default class Placeholder extends PureComponent {
  static defaultProps = {
    width: 150,
    height: 20
  }

  render = () => {
    const { width, height, style } = this.props
    return (
      <Svg style={style} width={width} height={height} >
        <Svg.G fillRule='evenodd' fill='none'>
          <Svg.Rect fill='#F8F8F8' x='0' y='0' width={width} height={height} rx='5' />
        </Svg.G>
      </Svg>
    )
  }
}
