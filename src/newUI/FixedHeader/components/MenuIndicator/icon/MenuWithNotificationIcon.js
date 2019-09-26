import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

export default class MenuWithNotificationIcon extends React.PureComponent {
  render () {
    return (
      <Svg width={26} height={18}>
        <G fill='none' fillRule='evenodd'>
          <Path
            d='M15.198 3a6.513 6.513 0 0 0-.125 2.571H1.413A1.28 1.28 0 0 1 .148 4.286C.148 3.579.717 3 1.413 3h13.785zm4.586 7.868c-.157.53-.642.918-1.212.918H1.412A1.28 1.28 0 0 1 .149 10.5c0-.707.569-1.286 1.265-1.286h15.512a6.493 6.493 0 0 0 2.86 1.654zm-1.212 4.56a1.28 1.28 0 0 1 1.265 1.286A1.28 1.28 0 0 1 18.572 18H1.412a1.28 1.28 0 0 1-1.264-1.286c0-.707.569-1.285 1.265-1.285h17.159z'
            fill='#FFF'
            fillRule='nonzero'
          />
          <Circle fill='#FF4086' cx={21.5} cy={4.597} r={4.5} />
        </G>
      </Svg>
    )
  }
}
