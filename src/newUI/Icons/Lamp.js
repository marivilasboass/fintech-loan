import React from 'react'
import { Svg } from 'expo'

export default class LampIcon extends React.PureComponent {
  static defaultProps = {
    color: '#CACBCC',
    color2: '#FF4086'
  }

  render () {
    const { color, color2 } = this.props

    return (
      <Svg width='40' height='64' viewBox='0 0 40 64' xmlns='http://www.w3.org/2000/svg'>
        <Svg.G id='Layout' fill='none' fillRule='evenodd'>
          <Svg.G id='Identificação-1' transform='translate(-70 -297)' fillRule='nonzero'>
            <Svg.G id='Group-10' transform='translate(48 297)'>
              <Svg.G id='lampada'>
                <Svg.G id='noun_749682_cc' transform='translate(22)'>
                  <Svg.G id='Group'>
                    <Svg.Path d='M19.8490566,10.6917647 C20.1509434,10.6917647 20.4528302,10.4658824 20.4528302,10.0894118 L20.4528302,1.20470588 C20.4528302,0.903529412 20.2264151,0.602352941 19.8490566,0.602352941 C19.5471698,0.602352941 19.245283,0.828235294 19.245283,1.20470588 L19.245283,10.0894118 C19.3207547,10.3905882 19.5471698,10.6917647 19.8490566,10.6917647 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M8.52830189,13.4023529 C8.60377358,13.5529412 8.83018868,13.7035294 8.98113208,13.7035294 C9.05660377,13.7035294 9.20754717,13.7035294 9.28301887,13.6282353 C9.58490566,13.4776471 9.66037736,13.1011765 9.50943396,12.8752941 L4.98113208,5.19529412 C4.83018868,4.89411765 4.45283019,4.81882353 4.22641509,4.96941176 C3.9245283,5.12 3.8490566,5.49647059 4,5.72235294 L8.52830189,13.4023529 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M14.2641509,10.7670588 C14.3396226,10.9929412 14.5660377,11.1435294 14.7924528,11.1435294 C14.8679245,11.1435294 14.9433962,11.1435294 14.9433962,11.1435294 C15.245283,11.0682353 15.3962264,10.7670588 15.3207547,10.4658824 L13.7358491,5.34588235 C13.6603774,5.04470588 13.3584906,4.89411765 13.0566038,4.96941176 C12.754717,5.04470588 12.6037736,5.34588235 12.6792453,5.64705882 L14.2641509,10.7670588 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M4.67924528,16.3388235 C4.75471698,16.4141176 4.90566038,16.4894118 5.05660377,16.4894118 C5.20754717,16.4894118 5.35849057,16.4141176 5.50943396,16.3388235 C5.73584906,16.1129412 5.73584906,15.7364706 5.50943396,15.5105882 L1.58490566,11.8964706 C1.35849057,11.6705882 0.981132075,11.6705882 0.754716981,11.8964706 C0.528301887,12.1223529 0.528301887,12.4988235 0.754716981,12.7247059 L4.67924528,16.3388235 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M30.490566,13.5529412 C30.5660377,13.6282353 30.7169811,13.6282353 30.7924528,13.6282353 C31.0188679,13.6282353 31.1698113,13.5529412 31.245283,13.3270588 L35.7735849,5.64705882 C35.9245283,5.34588235 35.8490566,5.04470588 35.5471698,4.89411765 C35.245283,4.74352941 34.9433962,4.81882353 34.7924528,5.12 L30.2641509,12.8 C30.1132075,13.1011765 30.1886792,13.4023529 30.490566,13.5529412 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M24.754717,11.1435294 C24.8301887,11.1435294 24.9056604,11.1435294 24.9056604,11.1435294 C25.1320755,11.1435294 25.3584906,10.9929412 25.4339623,10.7670588 L27.0188679,5.64705882 C27.0943396,5.34588235 26.9433962,5.04470588 26.6415094,4.96941176 C26.3396226,4.89411765 26.0377358,5.04470588 25.9622642,5.34588235 L24.3773585,10.4658824 C24.3018868,10.7670588 24.4528302,11.0682353 24.754717,11.1435294 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M34.3396226,16.3388235 C34.4150943,16.4894118 34.6415094,16.4894118 34.7924528,16.4894118 C34.9433962,16.4894118 35.0943396,16.4141176 35.1698113,16.3388235 L39.0943396,12.7247059 C39.3207547,12.4988235 39.3207547,12.1223529 39.0943396,11.8964706 C38.8679245,11.6705882 38.490566,11.6705882 38.2641509,11.8964706 L34.3396226,15.5105882 C34.1132075,15.7364706 34.1132075,16.1129412 34.3396226,16.3388235 Z'
                      id='Shape' fill={color2} />
                    <Svg.Path d='M19.9245283,38.4752941 C20.9056604,39.2282353 22.3396226,40.0564706 23.8490566,40.4329412 C22.7169811,44.4988235 21.8113208,50.3717647 21.509434,52.2541176 L18.3396226,52.2541176 C18.0377358,50.3717647 17.1320755,44.4235294 16,40.4329412 C17.509434,40.0564706 18.9433962,39.3035294 19.9245283,38.4752941 Z M18.5660377,35.2376471 C18.5660377,35.1623529 18.4150943,33.6564706 19.6981132,33.4305882 L20.0754717,33.4305882 C21.3584906,33.6564706 21.2075472,35.1623529 21.2075472,35.2376471 C21.1320755,35.9905882 20.3773585,36.7435294 19.8490566,37.12 C19.3962264,36.6682353 18.6415094,35.9905882 18.5660377,35.2376471 Z M17.509434,53.4588235 C17.6603774,53.5341176 17.7358491,53.6094118 17.8867925,53.5341176 C17.9622642,53.5341176 18.0377358,53.4588235 18.1132075,53.4588235 L21.5849057,53.4588235 C21.6603774,53.5341176 21.7358491,53.5341176 21.8113208,53.5341176 L21.8867925,53.5341176 C22.0377358,53.5341176 22.1132075,53.4588235 22.1886792,53.4588235 L26.7169811,53.4588235 C26.5660377,54.2870588 26.4150943,55.04 26.2641509,55.8682353 C26.2641509,55.9435294 26.2641509,56.0188235 26.1886792,56.1694118 L13.509434,56.1694118 C13.4339623,55.5670588 13.3584906,54.9647059 13.2075472,54.4376471 C13.1320755,54.1364706 13.0566038,53.8352941 12.9811321,53.5341176 L17.509434,53.4588235 Z M19.9245283,63.3976471 C18.0377358,63.3976471 16.3773585,62.4188235 16,61.0635294 L23.7735849,61.0635294 C23.4716981,62.4188235 21.8113208,63.3976471 19.9245283,63.3976471 Z M24.0754717,59.9341176 L15.6981132,59.9341176 C14.8679245,59.9341176 14.1132075,59.4070588 13.8113208,58.7294118 C13.7358491,58.2776471 13.6603774,57.7505882 13.6603774,57.2988235 L26.1886792,57.2988235 C26.1132075,57.6752941 26.1132075,58.0517647 26.0377358,58.4282353 C25.8113208,59.3317647 25.0566038,59.9341176 24.0754717,59.9341176 Z M34.7169811,30.0423529 C34.8679245,32.9035294 34.1886792,35.6894118 32.8301887,38.0988235 C32.8301887,38.0988235 32.8301887,38.0988235 32.8301887,38.1741176 C32.6792453,38.4 32.6037736,38.6258824 32.4528302,38.8517647 C30.0377358,42.9176471 28.3018868,47.5105882 27.0943396,52.3294118 L22.6415094,52.3294118 C22.9433962,50.2964706 23.8490566,44.5741176 24.9811321,40.6588235 C25.5849057,40.7341176 26.1886792,40.7341176 26.7169811,40.5835294 C28,40.2070588 28.5283019,38.9270588 28.4528302,37.8729412 C28.3773585,36.8941176 27.7735849,36.2164706 26.9433962,36.0658824 C26.4150943,35.9905882 25.4339623,36.2164706 24.9056604,37.4211765 C24.6792453,37.9482353 24.4528302,38.6258824 24.2264151,39.3788235 C23.0188679,39.0776471 21.7358491,38.4 20.9056604,37.7976471 C21.509434,37.2705882 22.3396226,36.4423529 22.4150943,35.3129412 C22.490566,34.0329412 21.8867925,32.5270588 20.3018868,32.3011765 L20.2264151,32.3011765 L19.6981132,32.3011765 L19.6226415,32.3011765 C18.0377358,32.6023529 17.4339623,34.1082353 17.509434,35.3129412 C17.5849057,36.4423529 18.4150943,37.2705882 19.0188679,37.7976471 C18.1886792,38.4 16.9056604,39.0776471 15.6981132,39.3788235 C15.4716981,38.6258824 15.245283,37.9482353 15.0188679,37.4211765 C14.490566,36.2164706 13.509434,35.9905882 12.9811321,36.0658824 C12.1509434,36.1411765 11.5471698,36.8941176 11.4716981,37.8729412 C11.3962264,38.9270588 11.9245283,40.2070588 13.2075472,40.5835294 C13.7358491,40.7341176 14.3396226,40.7341176 14.9433962,40.6588235 C16,44.4988235 16.9811321,50.2211765 17.2830189,52.3294118 L12.8301887,52.3294118 C11.7735849,47.7364706 10.1132075,43.4447059 7.9245283,39.5294118 C7.54716981,38.8517647 7.09433962,38.1741176 6.71698113,37.4964706 C6.71698113,37.4964706 6.71698113,37.4211765 6.64150943,37.4211765 C5.66037736,35.3882353 5.13207547,33.1294118 5.13207547,30.8705882 C5.13207547,26.8047059 6.86792453,22.8141176 9.88679245,20.0282353 C12.9056604,17.1670588 16.9056604,15.8117647 21.0566038,16.0376471 C23.8490566,16.2635294 26.490566,17.1670588 28.6792453,18.7482353 C28.754717,18.8235294 28.8301887,18.8988235 28.9056604,18.8988235 C32.1509434,21.3835294 34.490566,25.4494118 34.7169811,30.0423529 Z M25.2830189,39.5294118 C25.509434,38.8517647 25.7358491,38.2494118 25.8867925,37.7976471 C26.1886792,37.0447059 26.7169811,37.12 26.7169811,37.12 C27.1698113,37.1952941 27.245283,37.7223529 27.245283,37.8729412 C27.3207547,38.4752941 27.0188679,39.2282353 26.3396226,39.3788235 C26.0377358,39.5294118 25.6603774,39.6047059 25.2830189,39.5294118 Z M14.5660377,39.5294118 C14.1886792,39.5294118 13.8113208,39.5294118 13.509434,39.4541176 C12.8301887,39.2282353 12.5283019,38.5505882 12.6037736,37.9482353 C12.6037736,37.7976471 12.6792453,37.2705882 13.1320755,37.1952941 C13.2830189,37.1952941 13.6603774,37.2705882 13.9622642,37.8729412 C14.1132075,38.3247059 14.3396226,38.8517647 14.5660377,39.5294118 Z'
                      id='Shape' fill={color} />
                  </Svg.G>
                </Svg.G>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}
