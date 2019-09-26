import React from 'react'
import { Svg } from 'expo'

export default () => (
  <Svg width='84' height='84' viewBox='0 0 84 84' version='1.1'>
    <Svg.G fill='none' fillRule='evenodd' transform='translate(1 1)'>
      <Svg.Circle cx='40' cy='40' r='40' stroke='#FFF' strokeWidth='2' />
      <Svg.Circle cx='24.5' cy='33.5' r='5.5' fill='#FFF' fillRule='nonzero' />
      <Svg.Circle cx='54.5' cy='33.5' r='5.5' fill='#FFF' fillRule='nonzero' />
      <Svg.Path stroke='#FFF' strokeLinecap='round' strokeWidth='2' d='M58,58 C54.6827586,50.8791209 47.6655172,46 39.5,46 C31.3344828,46 24.3172414,50.8791209 21,58' />
    </Svg.G>
  </Svg>
)
