import React from 'react'
import { Svg } from 'expo'

import { Colors } from '~/newUI'

export default class CNHBackImage extends React.PureComponent {
  render () {
    const width = 376
    const height = 547
    const scale = 0.666

    return (
      <Svg width={width * scale} height={height * scale} viewBox='0 0 376 547' xmlns='http://www.w3.org/2000/svg' {...this.props}>
        <Svg.G id='Mask---RG/CNH/Selfie' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Artboard-Copy' transform='translate(-89.000000, -640.000000)' fill='none'>
            <Svg.G id='CNH-verso' transform='translate(277.000000, 913.500000) rotate(-270.000000) translate(-277.000000, -913.500000) translate(3.500000, 725.500000)' fill='none'>
              <Svg.G id='noun_signature_98225' transform='translate(182.000000, 155.000000)' fill={Colors.white} fillOpacity='0.5' fillRule='nonzero'>
                <Svg.G id='Group'>
                  <Svg.Path stroke={Colors.white} d='M55.6054945,45.102439 C45.8384615,45.102439 37.8472527,42.5219512 34.4065934,38.2585366 C31.6318681,40.2780488 28.7461538,41.7365854 26.4153846,41.8487805 C23.9736264,41.9609756 21.9758242,40.7268293 20.7549451,38.4829268 C18.4241758,34.1073171 19.0901099,25.5804878 25.7494505,16.2682927 C26.8593407,14.8097561 36.2934066,2.13170732 41.9538462,4.03902439 C44.2846154,4.82439024 45.5054945,7.74146341 45.5054945,13.3512195 L44.3956044,13.3512195 C44.3956044,8.86341463 43.3967033,5.6097561 41.6208791,5.04878049 C38.1802198,3.92682927 31.4098901,10.4341463 26.6373626,16.9414634 C20.2,25.804878 19.5340659,33.7707317 21.7538462,37.9219512 C22.7527473,39.8292683 24.4175824,40.8390244 26.4153846,40.7268293 C28.5241758,40.6146341 31.1879121,39.1560976 33.7406593,37.2487805 C33.2967033,36.5756098 33.0747253,36.0146341 32.8527473,35.2292683 C31.5208791,30.7414634 34.7395604,25.804878 41.8428571,21.8780488 C49.9450549,17.3902439 58.3802198,14.697561 64.5956044,14.3609756 C65.1505495,13.4634146 65.5945055,12.6780488 66.1494505,11.8926829 C72.4758242,1.57073171 72.8087912,1.23414634 73.4747253,1.68292683 C74.1406593,2.0195122 74.3626374,2.13170732 69.8120879,12.5658537 C69.4791209,13.2390244 69.2571429,13.9121951 68.9241758,14.5853659 C71.032967,14.9219512 72.5868132,15.595122 73.5857143,16.8292683 C75.1395604,18.7365854 75.8054945,22.5512195 69.7010989,30.1804878 C62.5978022,39.0439024 60.821978,40.2780488 59.7120879,39.604878 C58.6021978,38.9317073 58.2692308,36.4634146 67.3703297,15.595122 C66.7043956,15.595122 66.0384615,15.595122 65.2615385,15.595122 C55.1615385,31.9756098 49.5010989,40.0536585 46.9483516,39.0439024 C45.5054945,38.4829268 44.6175824,37.697561 44.2846154,36.8 C43.8406593,35.5658537 44.3956044,34.2195122 45.0615385,32.8731707 C45.5054945,31.8634146 46.0604396,30.7414634 45.9494505,29.8439024 C45.9494505,29.7317073 45.9494505,29.7317073 45.9494505,29.7317073 C45.9494505,29.7317073 45.9494505,29.7317073 45.9494505,29.7317073 C45.2835165,29.7317073 42.6197802,31.9756098 40.4,33.6585366 C38.8461538,34.8926829 37.1813187,36.3512195 35.4054945,37.5853659 C38.9571429,41.8487805 48.1692308,44.9902439 61.4879121,43.6439024 C86.2384615,41.1756098 98.7802198,18.8487805 98.8912088,18.6243902 L99.8901099,19.1853659 C99.7791209,19.4097561 86.9043956,42.297561 61.5989011,44.7658537 C59.4901099,44.9902439 57.4923077,45.102439 55.6054945,45.102439 Z M68.4802198,15.3707317 C60.378022,33.8829268 59.8230769,38.1463415 60.267033,38.1463415 C60.267033,38.1463415 60.267033,38.1463415 60.267033,38.1463415 C60.821978,38.1463415 62.7087912,36.8 68.8131868,29.1707317 C73.2527473,23.6731707 74.4736264,19.5219512 72.6978022,17.2780488 C71.9208791,16.2682927 70.367033,15.7073171 68.4802198,15.3707317 Z M45.9494505,28.6097561 C46.0604396,28.6097561 46.2824176,28.6097561 46.3934066,28.7219512 C46.6153846,28.8341463 46.9483516,29.0585366 47.0593407,29.7317073 C47.1703297,30.9658537 46.6153846,32.2 46.0604396,33.3219512 C45.5054945,34.4439024 45.0615385,35.4536585 45.3945055,36.3512195 C45.6164835,36.9121951 46.2824176,37.4731707 47.5032967,37.9219512 C49.6120879,38.7073171 58.3802198,24.9073171 64.0406593,15.595122 C58.0472527,16.1560976 50.167033,18.7365854 42.5087912,23 C35.8494505,26.702439 32.7417582,31.0780488 33.9626374,35.004878 C34.1846154,35.5658537 34.4065934,36.1268293 34.7395604,36.6878049 C36.5153846,35.4536585 38.1802198,33.995122 39.7340659,32.7609756 C42.9527473,30.0682927 44.7285714,28.6097561 45.9494505,28.6097561 Z M66.2604396,14.4731707 C66.8153846,14.4731707 67.3703297,14.4731707 67.8142857,14.5853659 C68.1472527,13.8 68.4802198,13.1268293 68.8131868,12.3414634 C70.367033,8.75121951 71.3659341,6.39512195 72.0318681,4.93658537 C70.810989,6.84390244 68.9241758,9.87317073 67.1483516,12.7902439 C66.8153846,13.4634146 66.3714286,14.0243902 66.0384615,14.5853659 C66.0384615,14.4731707 66.1494505,14.4731707 66.2604396,14.4731707 Z' id='Shape' />
                  <Svg.Path stroke={Colors.white} d='M7.43626374,44.204878 C5.10549451,44.204878 2.88571429,43.0829268 1.10989011,41.0634146 C-1.2559398e-15,39.8292683 -0.221978022,38.3707317 0.332967033,36.8 C1.77582418,32.5365854 9.65604396,27.3756098 20.310989,22.8878049 C21.9758242,15.8195122 22.3087912,10.4341463 20.643956,0.448780488 L21.7538462,0.224390244 C23.4186813,10.097561 23.0857143,15.595122 21.6428571,22.3268293 C30.8549451,18.5121951 41.8428571,15.2585366 52.6087912,13.4634146 L52.8307692,14.5853659 C41.8428571,16.3804878 30.521978,19.7463415 21.4208791,23.5609756 C20.8659341,25.9170732 20.089011,28.497561 19.3120879,31.5268293 C17.4252747,38.4829268 13.7626374,42.9707317 9.43406593,43.9804878 C8.65714286,44.204878 7.99120879,44.204878 7.43626374,44.204878 Z M19.867033,24.1219512 C9.87802198,28.3853659 2.66373626,33.2097561 1.33186813,37.1365854 C0.887912088,38.3707317 1.10989011,39.3804878 1.88681319,40.2780488 C3.88461538,42.5219512 6.32637363,43.4195122 8.87912088,42.8585366 C12.7637363,41.9609756 16.2043956,37.5853659 17.8692308,31.302439 C18.7571429,28.7219512 19.4230769,26.3658537 19.867033,24.1219512 Z' id='Shape' />
                </Svg.G>
              </Svg.G>
              <Svg.Rect id='Rectangle-4-Copy' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='1' y='1' width='545' height='374' />
              <Svg.Rect id='Rectangle-6-Copy-7' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='75' y='12' width='442' height='131' rx='4' />
              <Svg.Rect id='Rectangle-6-Copy-8' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='78' y='212' width='310' height='27' rx='4' />
              <Svg.Rect id='Rectangle-6-Copy-8' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='392' y='212' width='121' height='27' rx='4' />
              <Svg.Path d='M-46,68 L-46,128 L125,128 L125,68 L-46,68 Z' id='Rectangle-7' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' transform='translate(39.500000, 98.000000) rotate(-90.000000) translate(-39.500000, -98.000000) ' />
              <Svg.Path d='M93,199 L397,199' id='Path-2' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' />
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}