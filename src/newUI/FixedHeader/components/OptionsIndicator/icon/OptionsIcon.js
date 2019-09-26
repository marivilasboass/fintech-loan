import React from 'react'
import Svg from 'react-native-svg'

export default class FilterIcon extends React.PureComponent {
  render () {
    return (
      <Svg width={20} height={5}>
        <Svg.G id='Views' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
          <Svg.G id='Notificações-&quot;Todas&quot;' transform='translate(-335.000000, -38.000000)' fill='#FFFFFF'>
            <Svg.G id='•-header'>
              <Svg.G id='ico_more' transform='translate(335.000000, 38.000000)'>
                <Svg.Circle id='Oval' cx='17.5' cy='2.5' r='2.5' />
                <Svg.Circle id='Oval' cx='10' cy='2.5' r='2.5' />
                <Svg.Circle id='Oval' cx='2.5' cy='2.5' r='2.5' />
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
