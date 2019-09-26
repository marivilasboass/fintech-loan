import React from 'react'
import { Svg } from 'expo'

import { Colors } from '~/newUI'

export default class RGBackImage extends React.PureComponent {
  render () {
    const width = 378
    const height = 600
    const scale = 0.666

    return (
      <Svg width={width * scale} height={height * scale} viewBox='0 0 378 600' xmlns='http://www.w3.org/2000/svg' {...this.props}>
        <Svg.G id='Mask---RG/CNH' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' transform='translate(189.000000, 300.000000) rotate(-270.000000) translate(-300.000000, -189.000000)'>
          <Svg.Rect id='Rectangle-Copy' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' transform='translate(300.000000, 189.000000) rotate(-270.000000) translate(-300.000000, -189.000000)' x='112' y='-110' width='376' height='598' />
          <Svg.Rect id='Rectangle-3' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='50' width='222' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-3' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='142' width='478' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-4' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='178' width='478' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-5' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='237' width='153' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-7' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='277' width='478' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-6' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='402' y='237' width='138' height='22' />
          <Svg.Rect id='Rectangle-3-Copy-2' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='418' y='50' width='122' height='22' />
          <Svg.Rect id='Rectangle-3-Copy' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='62' y='96' width='478' height='22' />
          <Svg.G id='noun_signature_98225' transform='translate(250.000000, 316.000000)' fill={Colors.white} fillOpacity='0.5' fillRule='nonzero'>
            <Svg.G id='Group'>
              <Svg.Path stroke={Colors.white} d='M50.1,40.2 C41.3,40.2 34.1,37.9 31,34.1 C28.5,35.9 25.9,37.2 23.8,37.3 C21.6,37.4 19.8,36.3 18.7,34.3 C16.6,30.4 17.2,22.8 23.2,14.5 C24.2,13.2 32.7,1.9 37.8,3.6 C39.9,4.3 41,6.9 41,11.9 L40,11.9 C40,7.9 39.1,5 37.5,4.5 C34.4,3.5 28.3,9.3 24,15.1 C18.2,23 17.6,30.1 19.6,33.8 C20.5,35.5 22,36.4 23.8,36.3 C25.7,36.2 28.1,34.9 30.4,33.2 C30,32.6 29.8,32.1 29.6,31.4 C28.4,27.4 31.3,23 37.7,19.5 C45,15.5 52.6,13.1 58.2,12.8 C58.7,12 59.1,11.3 59.6,10.6 C65.3,1.4 65.6,1.1 66.2,1.5 C66.8,1.8 67,1.9 62.9,11.2 C62.6,11.8 62.4,12.4 62.1,13 C64,13.3 65.4,13.9 66.3,15 C67.7,16.7 68.3,20.1 62.8,26.9 C56.4,34.8 54.8,35.9 53.8,35.3 C52.8,34.7 52.5,32.5 60.7,13.9 C60.1,13.9 59.5,13.9 58.8,13.9 C49.7,28.5 44.6,35.7 42.3,34.8 C41,34.3 40.2,33.6 39.9,32.8 C39.5,31.7 40,30.5 40.6,29.3 C41,28.4 41.5,27.4 41.4,26.6 C41.4,26.5 41.4,26.5 41.4,26.5 C41.4,26.5 41.4,26.5 41.4,26.5 C40.8,26.5 38.4,28.5 36.4,30 C35,31.1 33.5,32.4 31.9,33.5 C35.1,37.3 43.4,40.1 55.4,38.9 C77.7,36.7 89,16.8 89.1,16.6 L90,17.1 C89.9,17.3 78.3,37.7 55.5,39.9 C53.6,40.1 51.8,40.2 50.1,40.2 Z M61.7,13.7 C54.4,30.2 53.9,34 54.3,34 C54.3,34 54.3,34 54.3,34 C54.8,34 56.5,32.8 62,26 C66,21.1 67.1,17.4 65.5,15.4 C64.8,14.5 63.4,14 61.7,13.7 Z M41.4,25.5 C41.5,25.5 41.7,25.5 41.8,25.6 C42,25.7 42.3,25.9 42.4,26.5 C42.5,27.6 42,28.7 41.5,29.7 C41,30.7 40.6,31.6 40.9,32.4 C41.1,32.9 41.7,33.4 42.8,33.8 C44.7,34.5 52.6,22.2 57.7,13.9 C52.3,14.4 45.2,16.7 38.3,20.5 C32.3,23.8 29.5,27.7 30.6,31.2 C30.8,31.7 31,32.2 31.3,32.7 C32.9,31.6 34.4,30.3 35.8,29.2 C38.7,26.8 40.3,25.5 41.4,25.5 Z M59.7,12.9 C60.2,12.9 60.7,12.9 61.1,13 C61.4,12.3 61.7,11.7 62,11 C63.4,7.8 64.3,5.7 64.9,4.4 C63.8,6.1 62.1,8.8 60.5,11.4 C60.2,12 59.8,12.5 59.5,13 C59.5,12.9 59.6,12.9 59.7,12.9 Z' id='Shape' />
              <Svg.Path stroke={Colors.white} d='M6.7,39.4 C4.6,39.4 2.6,38.4 1,36.6 C-1.11022302e-15,35.5 -0.2,34.2 0.3,32.8 C1.6,29 8.7,24.4 18.3,20.4 C19.8,14.1 20.1,9.3 18.6,0.4 L19.6,0.2 C21.1,9 20.8,13.9 19.5,19.9 C27.8,16.5 37.7,13.6 47.4,12 L47.6,13 C37.7,14.6 27.5,17.6 19.3,21 C18.8,23.1 18.1,25.4 17.4,28.1 C15.7,34.3 12.4,38.3 8.5,39.2 C7.8,39.4 7.2,39.4 6.7,39.4 Z M17.9,21.5 C8.9,25.3 2.4,29.6 1.2,33.1 C0.8,34.2 1,35.1 1.7,35.9 C3.5,37.9 5.7,38.7 8,38.2 C11.5,37.4 14.6,33.5 16.1,27.9 C16.9,25.6 17.5,23.5 17.9,21.5 Z' id='Shape' />
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
