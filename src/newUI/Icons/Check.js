import React from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Check extends React.PureComponent {
    static defaultProps = {
      color: Colors.supernova
    }
    render () {
      const { color, ...props } = this.props
      return (
        <Svg width='33' height='33' viewBox='0 0 33 33' {...props}>
          <Svg.G id='4-Components' fill='none' fillRule='evenodd'>
            <Svg.G id='4.3-Alerts' transform='translate(-554 -224)'>
              <Svg.G id='box' transform='translate(534 204)'>
                <Svg.G id='ico_check2' transform='translate(21 21)'>
                  <Svg.Circle id='Oval-8' fill={'transparent'} stroke={color} strokeWidth='2' cx='15.5' cy='15.5'
                    r='15.5' />
                  <Svg.Path d='M22.3816717,10.8029594 C22.0552847,10.8124717 21.7454104,10.9486286 21.5176515,11.1826047 C21.2341376,11.466129 19.3576008,13.3950202 17.4201008,15.3848851 C15.8470351,17.0004564 14.7386008,18.1370253 14.1145687,18.7754996 L10.5995772,16.0983564 C10.2459253,15.7906242 9.75040332,15.7052836 9.31418235,15.876981 C8.87796138,16.0486784 8.57354783,16.4488752 8.52452697,16.9151001 C8.47550611,17.381325 8.69002593,17.8360846 9.08099607,18.0947564 L13.4796447,21.4461287 C13.9799409,21.8267443 14.6845006,21.77921 15.129138,21.3348429 C15.4126518,21.0513395 17.2891886,19.1289625 19.2266886,17.1390976 C21.1641886,15.1492432 23.1626518,13.0918696 23.2980569,12.956475 C23.6671739,12.5943047 23.7767969,12.0430182 23.5743161,11.5671861 C23.3718353,11.0913539 22.8985798,10.7880996 22.3816717,10.8029594 Z'
                    id='Shape' fill={color} fillRule='nonzero' />
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg>
      )
    }
}
