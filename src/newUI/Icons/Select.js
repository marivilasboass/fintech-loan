
import React, { PureComponent } from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class PiggyBank extends PureComponent {
  static defaultProps = {
    color: Colors.nightRider
  }

  render () {
    return (
      <Svg width={10} height={17} {...this.props}>
        <Svg.G fill='#9394BA' fillRule='nonzero'>
          <Svg.Path d='M.928 11.68a.856.856 0 0 1 1.475-.61l2.657 2.84 2.657-2.84a.84.84 0 0 1 1.217-.017c.343.33.36.888.017 1.237l-3.274 3.483a.855.855 0 0 1-1.217.035c-.017 0-.017-.017-.034-.035L1.134 12.29a.878.878 0 0 1-.206-.61zM.928 5.32a.856.856 0 0 0 1.475.61L5.06 3.09l2.657 2.84a.84.84 0 0 0 1.217.017.872.872 0 0 0 .017-1.237L5.677 1.227a.855.855 0 0 0-1.217-.035c-.017 0-.017.017-.034.035L1.134 4.71a.878.878 0 0 0-.206.61z' />
        </Svg.G>
      </Svg>
    )
  }
}
