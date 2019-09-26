import React from 'react'
import { Svg } from 'expo'
import Colors from '../Colors'

export default class BackArrow extends React.Component {
  static defaultProps = {
    color: Colors.brightBlue
  }

  render () {
    const { color } = this.props
    return (
      <Svg width='24' height='15' viewBox='0 0 24 15' {...this.props}>
        <Svg.G id='Views' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Entrar' transform='translate(-20.000000, -40.000000)' fill={color} fillRule='nonzero'>
            <Svg.G id='•-header'>
              <Svg.G id='ico_back' transform='translate(20.000000, 40.000000)'>
                <Svg.G id='1569919' transform='translate(0.000000, 0.637820)'>
                  <Svg.Path d='M23.9999968,7.30157077 C23.9901145,7.04921781 23.8862439,6.7575472 23.7132321,6.57359425 L18.0661693,0.573293798 C17.6835104,0.229423184 16.9497457,0.0874702317 16.5220515,0.485058497 C16.1007809,0.876646762 16.1133103,1.63610564 16.5329927,2.02924685 L20.5035812,6.24269422 L1.05881861,6.24269422 C0.474065624,6.24269422 -5.0000001e-06,6.7167825 -5.0000001e-06,7.30157077 C-5.0000001e-06,7.88635905 0.474065624,8.36042968 1.05881861,8.36042968 L20.5035812,8.36042968 L16.5329927,12.5738771 C16.1716868,12.9358183 16.1049103,13.7219948 16.5220515,14.1180654 C16.9390869,14.5141007 17.6992163,14.3875713 18.0661693,14.0297948 L23.7132321,8.0295473 C23.9064674,7.82420611 24.0006321,7.58328844 23.9999968,7.30157077 L23.9999968,7.30157077 Z' id='Shape' transform='translate(11.999997, 7.303413) scale(-1, 1) translate(-11.999997, -7.303413) ' />
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
