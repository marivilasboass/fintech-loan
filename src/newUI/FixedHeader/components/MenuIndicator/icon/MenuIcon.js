import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export default class MenuIcon extends React.PureComponent {
  render () {
    return (
      <Svg width={20} height={15}>
        <G fillRule='nonzero' fill='#FFF'>
          <Path d='M1.413 2.571h17.159a1.28 1.28 0 0 0 1.265-1.285A1.28 1.28 0 0 0 18.572 0H1.412A1.28 1.28 0 0 0 .149 1.286c0 .707.569 1.285 1.265 1.285zM18.572 6.214H1.412A1.28 1.28 0 0 0 .149 7.5c0 .707.569 1.286 1.265 1.286h17.159A1.28 1.28 0 0 0 19.837 7.5a1.28 1.28 0 0 0-1.265-1.286zM18.572 12.429H1.412a1.28 1.28 0 0 0-1.264 1.285C.148 14.421.717 15 1.413 15h17.159a1.28 1.28 0 0 0 1.265-1.286 1.28 1.28 0 0 0-1.265-1.285z' />
        </G>
      </Svg>
    )
  }
}
