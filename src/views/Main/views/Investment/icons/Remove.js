import React from 'react'
import { Svg } from 'expo'

export default class Clock extends React.PureComponent {
  static defaultProps = {
    color: '#FFFFFF'
  }

  render () {
    return (
      <Svg width='12' style={{ marginTop: 4 }} height='4' viewBox='0 0 12 4'>
        <Svg.G id='Views' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Detalhes-Investimento-&quot;3-cotas&quot;' transform='translate(-19.000000, -1262.000000)' fill={this.props.color} fillRule='nonzero'>
            <Svg.G id='•-content' transform='translate(-1.000000, 64.000000)'>
              <Svg.G id='btn_dafault-(active)' transform='translate(0.975000, 1173.000000)'>
                <Svg.Path d='M29.783,28.04 L20.279,28.04 C19.6725913,28.04 19.181,27.5484087 19.181,26.942 L19.181,26.942 C19.181,26.3355913 19.6725913,25.844 20.279,25.844 L29.783,25.844 C30.3894087,25.844 30.881,26.3355913 30.881,26.942 L30.881,26.942 C30.881,27.5484087 30.3894087,28.04 29.783,28.04 Z' id='+' />
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
