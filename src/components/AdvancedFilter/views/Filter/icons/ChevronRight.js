import React from 'react'
import SVG, { G, Polyline } from 'react-native-svg'

export default class ChevronRight extends React.PureComponent {
  render () {
    return (
      <SVG width='6' height='9' viewBox='0 0 6 9' {...this.props}>
        <G id='Views' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
          <G id='2.-Novo-investimento-&gt;-Filtrar' transform='translate(-160.000000, -748.000000)' stroke='#368DF7' strokeWidth='2'>
            <G id='•-content' transform='translate(0.000000, 38.000000)'>
              <G id='block-&quot;score&quot;' transform='translate(21.000000, 484.000000)'>
                <G id='link' transform='translate(0.000000, 219.000000)'>
                  <Polyline id='Shape-Copy-2' points='140 8 144 11.5 140 15' />
                </G>
              </G>
            </G>
          </G>
        </G>
      </SVG>
    )
  }
}
