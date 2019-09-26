import React from 'react'
import { Svg } from 'expo'

export default class LampIcon extends React.PureComponent {
  static defaultProps = {
    color: '#CACBCC',
    color2: '#FF4086',
    color3: '#FFF'
  }

  render () {
    const { color, color2, color3 } = this.props

    return (
      <Svg width='42' height='50' viewBox='0 0 42 50' xmlns='http://www.w3.org/2000/svg'>
        <Svg.G id='3-Icons' fill='none' fillRule='evenodd'>
          <Svg.G id='3.2-Illustrations' transform='translate(-749 -1112)'>
            <Svg.G id='12' transform='translate(683 1058)'>
              <Svg.G id='ico_shake' transform='rotate(-6 578.231 -587.558)'>
                <Svg.Rect id='Rectangle-4' fill={color2} transform='rotate(90 3.712 22.738)'
                  x='-10.209' y='22.274' width='27.842' height='1' rx='0.5' />
                <Svg.Rect id='Rectangle-4-Copy-2' fill={color2} transform='rotate(90 36.19 22.835)'
                  x='22.269' y='22.371' width='27.842' height='1' rx='0.5' />
                <Svg.Rect id='Rectangle-4-Copy' fill={color2} transform='rotate(90 .464 21.81)'
                  x='-8.353' y='21.346' width='17.633' height='1' rx='0.5' />
                <Svg.Rect id='Rectangle-4-Copy-3' fill={color2} transform='rotate(90 39.438 21.907)'
                  x='30.621' y='21.443' width='17.633' height='1' rx='0.5' />
                <Svg.G id='phone-icon' transform='translate(7.425)'>
                  <Svg.Rect id='Rectangle-2' fill={color} width='24.987' height='48.26' rx='4'
                  />
                  <Svg.Rect id='Rectangle-3' fill={color3} x='6.996' y='3.016' width='11.994'
                    height='1.005' rx='0.503' />
                  <Svg.Ellipse id='Oval' fill={color3} cx='12.993' cy='44.238' rx='1.999' ry='2.011'
                  />
                  <Svg.Path d='M0,40.2167251 L25.0067125,40.2167251' id='Path-31' stroke={color3}
                    strokeWidth='0.5' />
                  <Svg.Path d='M0,7.03792689 L25.0067125,7.03792689' id='Path-31-Copy' stroke={color3}
                    strokeWidth='0.5' />
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
