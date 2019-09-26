import React, { PureComponent } from 'react'
import { Svg } from 'expo'

export default class Placeholder extends PureComponent {
  render = () => (
    <Svg width={340} height={206}>
      <Svg.G fillRule='evenodd' fill='none'>
        <Svg.Rect fill='#F8F8F8' x='70' y='132' width='131' height='20' rx='5' />
        <Svg.Rect fill='#F8F8F8' x='29' y='38' width='245' height='20' rx='5' />
        <Svg.Path d='M34 0h129a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H34a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5z' fill='#F8F8F8' />
        <Svg.Rect fill='#F8F8F8' y='170' width='340' height='15' rx='5' />
        <Svg.Rect fill='#F8F8F8' y='191' width='254' height='15' rx='5' />
        <Svg.Rect fill='#F8F8F8' x='70' y='103' width='57' height='20' rx='5' />
        <Svg.G transform='translate(4.065 104)'>
          <Svg.Ellipse stroke='#DBDBDB' opacity='.504' cx='25.081' cy='25' rx='25.081' ry='25' />
          <Svg.Path d='M35.411 33.06c0 2.207-4.54 3.363-10.475 3.369-5.944.005-10.477-1.146-10.477-3.368 0-2.355 2.944-5.163 6.621-6.361a.32.32 0 0 0 .106-.551 3.53 3.53 0 0 1-.077-.066c-1.381-1.212-2.227-3.049-2.227-5.048 0-3.586 2.7-6.511 6.053-6.511 3.354 0 6.053 2.925 6.053 6.511 0 1.98-.83 3.802-2.189 5.015l-.105.09a.33.33 0 0 0 .108.569c3.664 1.206 6.61 4.022 6.61 6.352z' fill='#DBDBDB' fillRule='nonzero' />
        </Svg.G>
      </Svg.G>
    </Svg>
  )
}
