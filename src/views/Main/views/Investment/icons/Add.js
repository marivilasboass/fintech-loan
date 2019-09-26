import React from 'react'
import { Svg } from 'expo'

export default class Clock extends React.PureComponent {
  static defaultProps = {
    color: '#FFFFFF'
  }

  render () {
    return (
      <Svg width='12' style={{ marginTop: 2 }} height='13' viewBox='0 0 12 13'>
        <Svg.G id='Views' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Detalhes-Investimento-&quot;3-cotas&quot;' transform='translate(-116.000000, -1257.000000)' fill={this.props.color} fillRule='nonzero'>
            <Svg.G id='•-content' transform='translate(-1.000000, 64.000000)'>
              <Svg.G id='btn_dafault-(active)' transform='translate(0.975000, 1173.000000)'>
                <Svg.Path d='M126.783,28.04 L123.225,28.04 L123.225,31.778 C123.225,32.4440554 122.685055,32.984 122.019,32.984 L122.019,32.984 C121.352945,32.984 120.813,32.4440554 120.813,31.778 L120.813,28.04 L117.279,28.04 C116.672591,28.04 116.181,27.5484087 116.181,26.942 L116.181,26.942 C116.181,26.3355913 116.672591,25.844 117.279,25.844 L120.813,25.844 L120.813,22.13 C120.813,21.4639446 121.352945,20.924 122.019,20.924 L122.019,20.924 C122.685055,20.924 123.225,21.4639446 123.225,22.13 L123.225,25.844 L126.783,25.844 C127.389409,25.844 127.881,26.3355913 127.881,26.942 L127.881,26.942 C127.881,27.5484087 127.389409,28.04 126.783,28.04 Z' id='+' />
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
