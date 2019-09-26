import React from 'react'
import { Svg } from 'expo'

import { Colors } from '~/newUI'

export default class SelfieImage extends React.PureComponent {
  render () {
    const width = 261
    const height = 332
    return (
      <Svg width={width} height={height} viewBox='0 0 261 332' xmlns='http://www.w3.org/2000/svg' {...this.props}>
        <Svg.Path fill='none' stroke={Colors.white} strokeWidth='2' d='M301.246137,341.302954 C287.19613,409.377198 243.601892,459 192,459 C140.352865,459 96.7274331,409.290146 82.7169755,341.123858 C69.5723252,329.275586 63,315.871836 63,300.912609 C63,279.285091 77.4702639,274.436254 78.8265321,274.029282 C85.6375323,192.320097 133.709769,129 192,129 C250.386713,129 298.521579,192.529886 305.206949,274.435169 L305.234238,274 C305.234238,274 321.162438,278.221705 321.162438,300.912609 C321.162438,315.94726 314.523671,329.410708 301.246137,341.302954 Z' transform='translate(-62 -128)' />
      </Svg>
    )
  }
}
