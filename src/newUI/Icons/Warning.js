import React from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Warning extends React.PureComponent {
    static defaultProps = {
      color: Colors.supernova
    }
    render () {
      const { color, ...props } = this.props
      return (
        <Svg width={33} height={33} viewBox='0 0 33 33' {...props}>
          <Svg.G id='4-Components' fill='none' fillRule='evenodd'>
            <Svg.G id='4.3-Alerts' transform='translate(-988 -223)'>
              <Svg.G id='box' transform='translate(969 204)'>
                <Svg.G id='ico_warning' transform='translate(20 20)'>
                  <Svg.Circle id='Oval-8' fill={'transparent'} stroke={color} strokeWidth='2' cx='15.5' cy='15.5'
                    r='15.5' />
                  <Svg.Rect id='Rectangle-2' fill={color} fillRule='nonzero' x='9' y='14'
                    width='14' height='3' rx='1.5' />
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg>
      )
    }
}
