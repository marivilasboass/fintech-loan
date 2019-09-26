import React from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Reload extends React.PureComponent {
  static defaultProps = {
    color: Colors.disabledGray
  }

  render () {
    const { color, width, height, style } = this.props

    return (
      <Svg viewBox='0 0 11 12' width={width || 11} height={height || 12} style={style}>
        <Svg.Path fill={color} d='M10.687 7.363a.431.431 0 0 0-.536.288c-.519 1.742-2.128 3.498-4.553 3.498-2.29 0-4.744-1.91-4.744-4.754 0-2.294 1.906-4.753 4.744-4.753 1.524 0 2.769.774 3.547 1.606l-2.32-.036a.432.432 0 0 0 0 .864l3.25.05a.43.43 0 0 0 .438-.439l-.05-3.255a.432.432 0 1 0-.863 0l.032 2.047A5.69 5.69 0 0 0 5.607.765C2.254.765 0 3.669 0 6.382 0 9.096 2.253 12 5.607 12c2.875 0 4.768-2.067 5.38-4.114a.432.432 0 0 0-.3-.523z' />
      </Svg>
    )
  }
}
