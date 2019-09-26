import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default class FilterIcon extends React.PureComponent {
  render () {
    return (
      <Svg width={20} height={18}>
        <Path
          d='M11.51 1.87H.73A.723.723 0 0 0 0 2.6c0 .409.321.73.73.73h10.78a2.612 2.612 0 0 0 2.512 1.87c1.168 0 2.19-.789 2.483-1.87h2.658c.409 0 .73-.321.73-.73a.723.723 0 0 0-.73-.73h-2.658a2.603 2.603 0 0 0-4.996 0zm3.622.73a1.14 1.14 0 0 1-1.14 1.14 1.14 1.14 0 0 1-1.139-1.14c0-.643.526-1.14 1.14-1.14.584 0 1.139.497 1.139 1.14zM2.746 7.712H.73a.723.723 0 0 0-.73.73c0 .41.321.73.73.73h2.016a2.612 2.612 0 0 0 2.512 1.87c1.169 0 2.191-.789 2.483-1.87h11.422c.409 0 .73-.32.73-.73a.723.723 0 0 0-.73-.73H7.74a2.603 2.603 0 0 0-4.995 0zm3.622.73a1.14 1.14 0 0 1-1.14 1.14 1.14 1.14 0 0 1-1.138-1.14c0-.642.525-1.14 1.139-1.14.613 0 1.14.498 1.14 1.14zm1.636 5.696H.73a.723.723 0 0 0-.73.73c0 .41.321.731.73.731h7.274a2.612 2.612 0 0 0 2.512 1.87c1.169 0 2.191-.79 2.483-1.87h6.164c.409 0 .73-.321.73-.73a.723.723 0 0 0-.73-.73h-6.164a2.603 2.603 0 0 0-4.995 0zm3.622.73a1.14 1.14 0 0 1-1.139 1.14 1.14 1.14 0 0 1-1.14-1.14 1.14 1.14 0 0 1 2.279 0z'
          fill='#FFF'
          fillRule='nonzero'
        />
      </Svg>
    )
  }
}