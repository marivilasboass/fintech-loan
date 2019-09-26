import React from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Alert extends React.PureComponent {
    static defaultProps = {
      color: Colors.green
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
                  <Svg.Text id='!' fontFamily='Lato-Black, Lato' fontSize='20' fontWeight='700' fill={color}>
                    <Svg.TSpan x='13' y='23'>!</Svg.TSpan>
                  </Svg.Text>
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg>
      )
    }
}
