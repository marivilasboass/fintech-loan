import React from 'react'
import { Svg } from 'expo'
import Colors from '../Colors'

export default class Logo extends React.PureComponent {
  static defaultProps = {
    squareColor: Colors.mutualBlue,
    pinkSquareColor: Colors.mutualPink
  }

  render () {
    const { squareColor, pinkSquareColor } = this.props
    return (
      <Svg width='62' height='62' viewBox='0 0 62 62' {...this.props}>
        <Svg.G id='Views' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Bem-vindo' transform='translate(-30.000000, -93.000000)'>
            <Svg.G id='•-content'>
              <Svg.G id='logo' transform='translate(30.000000, 93.000000)'>
                <Svg.Path d='M3,0 L26,0 C27.6568542,-3.04359188e-16 29,1.34314575 29,3 L29,26 C29,27.6568542 27.6568542,29 26,29 L3,29 C1.34314575,29 2.02906125e-16,27.6568542 0,26 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z' id='Rectangle-2' fill={squareColor} />
                <Svg.Path d='M36,0 L59,0 C60.6568542,-3.04359188e-16 62,1.34314575 62,3 L62,26 C62,27.6568542 60.6568542,29 59,29 L36,29 C34.3431458,29 33,27.6568542 33,26 L33,3 C33,1.34314575 34.3431458,3.04359188e-16 36,0 Z' id='Rectangle-2' fill={squareColor} />
                <Svg.Path d='M3,33 L26,33 C27.6568542,33 29,34.3431458 29,36 L29,59 C29,60.6568542 27.6568542,62 26,62 L3,62 C1.34314575,62 2.02906125e-16,60.6568542 0,59 L0,36 C-2.02906125e-16,34.3431458 1.34314575,33 3,33 Z' id='Rectangle-2' fill={squareColor} />
                <Svg.Path d='M36,33 L59,33 C60.6568542,33 62,34.3431458 62,36 L62,59 C62,60.6568542 60.6568542,62 59,62 L36,62 C34.3431458,62 33,60.6568542 33,59 L33,36 C33,34.3431458 34.3431458,33 36,33 Z' id='Rectangle-2' fill={pinkSquareColor} />
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
