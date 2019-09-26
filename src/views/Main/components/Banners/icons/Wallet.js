import React from 'react'
import { Svg } from 'expo'

export default class Wallet extends React.PureComponent {
  render () {
    const color = this.props.color || '#d92567'

    return (
      <Svg width='87' height='147' viewBox='0 0 87 147' version='1.1' {...this.props}>
        <Svg.G stroke='none' strokeWidth='1' fillRule='evenodd'>
          <Svg.G transform='translate(-20.000000, -85.000000)' fill={color}>
            <Svg.G transform='translate(-3.000000, 85.000000)'>
              <Svg.Path fill={color} d='M24.9577465,141 L40.0422535,141 C40.5211268,141 41,140.625 41,140 C41,139.375 40.6408451,139 40.0422535,139 L24.9577465,139 C24.4788732,139 24,139.375 24,140 C24,140.625 24.4788732,141 24.9577465,141 Z' fillRule='nonzero' transform='translate(32.500000, 140.000000) scale(-1, 1) translate(-32.500000, -140.000000) '></Svg.Path>
              <Svg.Path fill={color} d='M44.9824561,141 L50.0175439,141 C50.5087719,141 51,140.625 51,140 C51,139.375 50.6315789,139 50.0175439,139 L44.9824561,139 C44.4912281,139 44,139.375 44,140 C44,140.625 44.4912281,141 44.9824561,141 Z' fillRule='nonzero' transform='translate(47.500000, 140.000000) scale(-1, 1) translate(-47.500000, -140.000000) '></Svg.Path>
              <Svg.Path fill={color} d='M46,146 C46,145.5 45.5673077,145 44.8461538,145 L32.1538462,145 C31.5769231,145 31,145.375 31,146 C31,146.5 31.4326923,147 32.1538462,147 L44.8461538,147 C45.5673077,146.875 46,146.5 46,146 Z' fillRule='nonzero' transform='translate(38.500000, 146.000000) scale(-1, 1) translate(-38.500000, -146.000000) '></Svg.Path>
              <Svg.G id='Group'>
                <Svg.Path fill={color} d='M44.8754223,5.86294161 C44.977035,5.96513789 45.1802603,6.06733416 45.3834856,6.06733416 C45.5867109,6.06733416 45.7899362,5.96513789 45.8915489,5.86294161 C46.1963868,5.5563528 46.1963868,5.04537143 45.8915489,4.73878261 L44.2657464,3.10364224 C43.9609085,2.79705342 43.4528452,2.79705342 43.1480072,3.10364224 C42.8431693,3.41023106 42.8431693,3.92121242 43.1480072,4.22780124 L44.8754223,5.86294161 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M50.0576677,11.0749516 C50.1592803,11.1771478 50.3625056,11.2793441 50.5657309,11.2793441 C50.7689563,11.2793441 50.9721816,11.1771478 51.0737942,11.0749516 C51.3786322,10.7683627 51.3786322,10.2573814 51.0737942,9.95079255 L49.4479918,8.31565217 C49.1431538,8.00906335 48.6350905,8.00906335 48.3302526,8.31565217 C48.0254146,8.62224099 48.0254146,9.13322236 48.3302526,9.43981118 L50.0576677,11.0749516 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M43.7576832,11.2793441 C43.9609085,11.2793441 44.1641338,11.1771478 44.2657464,11.0749516 L45.8915489,9.43981118 C46.1963868,9.13322236 46.1963868,8.62224099 45.8915489,8.31565217 C45.5867109,8.00906335 45.0786477,8.00906335 44.7738097,8.31565217 L43.1480072,9.95079255 C42.8431693,10.2573814 42.8431693,10.7683627 43.1480072,11.0749516 C43.3512325,11.2793441 43.5544578,11.2793441 43.7576832,11.2793441 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M49.0415411,6.06733416 C49.2447665,6.06733416 49.4479918,5.96513789 49.5496044,5.86294161 L51.1754069,4.22780124 C51.4802448,3.92121242 51.4802448,3.41023106 51.1754069,3.10364224 C50.8705689,2.79705342 50.3625056,2.79705342 50.0576677,3.10364224 L48.4318652,4.73878261 C48.1270273,5.04537143 48.1270273,5.5563528 48.4318652,5.86294161 C48.6350905,5.96513789 48.8383158,6.06733416 49.0415411,6.06733416 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M82.4330948,26.5554087 C83.245996,26.5554087 84.0588973,26.2488199 84.6685732,25.7378385 C86.0911503,24.5114832 86.2943756,22.2631652 84.9734111,20.8324174 C84.3637352,20.1170435 83.550834,19.7082584 82.6363201,19.6060621 C81.7218062,19.5038658 80.8072923,19.8104547 80.0960038,20.4236323 C79.3847152,21.0368099 78.9782646,21.8543801 78.8766519,22.7741466 C78.7750393,23.693913 79.0798772,24.6136795 79.6895531,25.3290534 C80.5024544,26.1466236 81.5185809,26.5554087 82.4330948,26.5554087 Z M81.213743,21.5477913 C81.6201936,21.2412025 82.1282568,21.0368099 82.6363201,21.0368099 C83.1443834,21.0368099 83.6524466,21.3433988 83.9572846,21.7521839 C84.6685732,22.569754 84.5669605,23.7961093 83.7540593,24.5114832 C82.9411581,25.2268571 81.7218062,25.1246609 81.0105176,24.3070907 C80.2992291,23.4895205 80.4008417,22.2631652 81.213743,21.5477913 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M76.2347229,55.6813466 L74.9137584,55.6813466 C75.0153711,57.5208795 76.0314976,58.5428422 77.962138,58.7472348 L77.962138,59.8713938 L78.6734266,59.8713938 L78.6734266,58.7472348 C79.5879405,58.6450385 80.2992291,58.3384497 80.8072923,57.725272 C81.3153556,57.1120944 81.6201936,56.3967205 81.6201936,55.5791503 C81.6201936,54.7615801 81.4169683,54.1484025 81.0105176,53.7396174 C80.604067,53.3308323 79.7911658,52.9220472 78.6734266,52.7176547 L78.6734266,49.2429814 C79.4863278,49.3451776 79.9943911,49.856159 79.9943911,50.7759255 L81.3153556,50.7759255 C81.1121303,49.2429814 80.1976164,48.3232149 78.571814,48.2210186 L78.571814,47.0968596 L77.962138,47.0968596 L77.962138,48.2210186 C77.0476241,48.3232149 76.4379482,48.6298037 75.929885,49.1407851 C75.4218217,49.6517665 75.1169837,50.3671404 75.1169837,51.1847106 C75.1169837,52.6154584 76.0314976,53.5352248 77.962138,53.9440099 L77.962138,57.8274683 C76.9460115,57.5208795 76.3363356,56.9077019 76.2347229,55.6813466 Z M78.6734266,53.9440099 C79.2831025,54.1484025 79.6895531,54.352795 79.9943911,54.5571876 C80.1976164,54.8637764 80.2992291,55.1703652 80.2992291,55.6813466 C80.2992291,56.9077019 79.7911658,57.5208795 78.6734266,57.6230758 L78.6734266,53.9440099 Z M76.8443988,52.104477 C76.5395609,51.9000845 76.4379482,51.4912994 76.4379482,50.980318 C76.4379482,49.9583553 76.9460115,49.4473739 77.962138,49.2429814 L77.962138,52.6154584 C77.5556874,52.5132621 77.1492368,52.3088696 76.8443988,52.104477 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M94.0169373,57.0098981 C95.9475777,57.0098981 97.4717675,55.476954 97.4717675,53.5352248 C97.4717675,51.5934957 95.9475777,50.0605516 94.0169373,50.0605516 C92.0862969,50.0605516 90.5621071,51.5934957 90.5621071,53.5352248 C90.5621071,55.3747578 92.0862969,57.0098981 94.0169373,57.0098981 Z M94.0169373,51.4912994 C95.1346765,51.4912994 95.9475777,52.4110658 95.9475777,53.4330286 C95.9475777,54.5571876 95.0330638,55.3747578 94.0169373,55.3747578 C92.8991981,55.3747578 92.0862969,54.4549913 92.0862969,53.4330286 C92.0862969,52.4110658 93.0008108,51.4912994 94.0169373,51.4912994 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M62.5170147,57.0098981 C64.4476551,57.0098981 65.9718449,55.476954 65.9718449,53.5352248 C65.9718449,51.5934957 64.4476551,50.0605516 62.5170147,50.0605516 C60.5863743,50.0605516 59.0621845,51.5934957 59.0621845,53.5352248 C59.0621845,55.3747578 60.5863743,57.0098981 62.5170147,57.0098981 Z M62.5170147,51.4912994 C63.6347539,51.4912994 64.4476551,52.4110658 64.4476551,53.4330286 C64.4476551,54.5571876 63.5331412,55.3747578 62.5170147,55.3747578 C61.3992755,55.3747578 60.5863743,54.4549913 60.5863743,53.4330286 C60.5863743,52.4110658 61.5008881,51.4912994 62.5170147,51.4912994 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M108.649159,36.1618584 L93.6104867,36.1618584 L104.178203,26.9641938 C104.483041,26.657605 104.483041,26.2488199 104.279815,25.8400348 L82.7379328,1.00634037 C82.6363201,0.801947826 82.4330948,0.801947826 82.2298695,0.699751553 C82.0266442,0.699751553 81.8234189,0.801947826 81.7218062,0.904144099 L35.7928868,40.862887 C35.5896615,40.9650832 35.5896615,41.1694758 35.4880488,41.3738683 C35.4880488,41.5782609 35.5896615,41.7826534 35.6912741,41.8848497 L47.0718913,55.0681689 L9.57682212,55.0681689 C4.59780209,55.0681689 0.533295941,59.1560199 0.533295941,64.1636373 L0.533295941,121.39355 C0.533295941,126.401168 4.59780209,130.489019 9.57682212,130.489019 L91.476621,130.489019 C96.455641,130.489019 100.520147,126.401168 100.520147,121.39355 L100.520147,102.691632 L104.483041,102.691632 C106.108843,102.691632 107.429808,101.363081 107.429808,99.7279404 L107.429808,85.9314435 C107.429808,84.2963031 106.108843,82.9677516 104.483041,82.9677516 L100.520147,82.9677516 L100.520147,70.7041988 L108.649159,70.7041988 C109.05561,70.7041988 109.462061,70.3976099 109.462061,69.8866286 L109.462061,36.9794286 C109.360448,36.5706435 109.05561,36.1618584 108.649159,36.1618584 Z M82.1282568,2.53928447 L102.5524,26.3510161 L91.2733957,36.1618584 L84.2621226,36.1618584 L93.0008108,28.5993342 C93.2040361,28.4971379 93.2040361,28.2927453 93.3056487,28.0883528 C93.3056487,27.8839602 93.2040361,27.6795677 93.1024234,27.5773714 C92.6959728,27.0663901 92.4927475,26.4532124 92.4927475,25.7378385 C92.4927475,25.1246609 92.7975855,24.5114832 93.3056487,24.0005019 C93.508874,23.8983056 93.508874,23.693913 93.6104867,23.4895205 C93.6104867,23.285128 93.508874,23.0807354 93.4072614,22.9785391 L84.2621226,12.2479304 C83.9572846,11.9413416 83.550834,11.9413416 83.1443834,12.1457342 C82.6363201,12.5545193 82.0266442,12.7589118 81.3153556,12.7589118 C80.7056797,12.7589118 80.0960038,12.452323 79.5879405,11.9413416 C79.4863278,11.7369491 79.2831025,11.7369491 79.0798772,11.6347528 C78.8766519,11.6347528 78.6734266,11.7369491 78.571814,11.8391453 L50.4251089,36.1618584 L47.8847925,36.1618584 C47.4783419,36.1618584 47.0718913,36.4684472 47.0718913,36.9794286 L47.0718913,52.9220472 L37.3170766,41.4760646 L82.1282568,2.53928447 Z M74.7105331,35.5486807 L71.8653788,33.0959702 C72.3734421,32.6871851 72.8815053,32.5849888 73.1863433,32.5849888 C73.4911813,32.5849888 73.8976319,32.7893814 74.2024698,33.0959702 C75.1169837,33.8113441 75.320209,34.6289143 74.7105331,35.5486807 Z M75.5234343,36.1618584 C76.1331103,35.4464845 76.3363356,34.6289143 76.2347229,33.9135404 C76.1331103,33.0959702 75.7266597,32.4827925 75.1169837,31.8696149 C74.5073078,31.3586335 73.8976319,31.0520447 73.287956,31.154241 C72.67828,31.154241 71.8653788,31.5630261 70.9508649,32.2784 L68.3089359,29.9278857 C68.9186119,29.4169043 69.6299004,29.3147081 70.341189,29.8256894 L71.2557029,28.8037267 C69.9347384,27.8839602 68.7153865,27.9861565 67.5976474,29.2125118 L66.7847461,28.4971379 L66.2766829,29.1103155 L67.0895841,29.8256894 C66.5815208,30.5410634 66.3782955,31.2564373 66.3782955,31.9718112 C66.3782955,32.6871851 66.7847461,33.3003627 67.3944221,33.9135404 C68.5121612,34.8333068 69.8331257,34.7311106 71.3573155,33.6069516 L74.3040825,36.1618584 C74.3040825,36.1618584 74.2024698,36.2640547 74.2024698,36.2640547 L71.9669915,36.2640547 C71.8653788,36.2640547 71.8653788,36.1618584 71.7637662,36.1618584 L71.6621535,36.2640547 L52.7621999,36.2640547 L78.8766519,13.4742857 C79.4863278,13.9852671 80.1976164,14.2918559 81.0105176,14.2918559 C81.8234189,14.3940522 82.6363201,14.1896596 83.3476087,13.7808745 L91.6798463,23.3873242 C91.171783,24.0005019 90.866945,24.818072 90.866945,25.6356422 C90.7653324,26.4532124 90.9685577,27.2707826 91.3750083,27.8839602 L81.8234189,36.1618584 L75.5234343,36.1618584 Z M70.341189,32.6871851 C69.9347384,32.9937739 69.6299004,33.0959702 69.2234498,33.1981665 C68.8169992,33.1981665 68.5121612,33.0959702 68.1057106,32.7893814 C67.3944221,32.1762037 67.2928094,31.3586335 67.8008727,30.5410634 L70.341189,32.6871851 Z M104.483041,84.3984994 C105.295942,84.3984994 105.905618,85.011677 105.905618,85.8292472 L105.905618,99.6257441 C105.905618,100.443314 105.295942,101.056492 104.483041,101.056492 L100.520147,101.056492 L80.4008417,101.056492 C80.1976164,101.056492 80.0960038,100.954296 79.9943911,100.852099 L76.6411735,93.8005565 L76.2347229,92.8807901 C76.2347229,92.8807901 76.2347229,92.8807901 76.2347229,92.8807901 C76.2347229,92.7785938 76.2347229,92.6763975 76.2347229,92.5742012 L79.9943911,84.7050882 C80.0960038,84.5006957 80.1976164,84.3984994 80.4008417,84.3984994 L100.520147,84.3984994 L104.483041,84.3984994 Z M98.8943447,82.8655553 L80.4008417,82.8655553 C79.6895531,82.8655553 78.9782646,83.2743404 78.571814,83.9897143 L74.8121458,91.9610236 C74.8121458,92.0632199 74.8121458,92.0632199 74.7105331,92.1654161 C74.5073078,92.6763975 74.5073078,93.1873789 74.8121458,93.6983602 L78.571814,101.66967 C78.8766519,102.385043 79.5879405,102.793829 80.4008417,102.793829 L98.9959573,102.793829 L98.9959573,121.495747 C98.9959573,125.685794 95.6427398,129.058271 91.5782336,129.058271 L9.57682212,129.058271 C5.41070332,129.058271 2.1590984,125.685794 2.1590984,121.495747 L2.1590984,64.2658335 C2.1590984,60.0757863 5.51231597,56.7033093 9.57682212,56.7033093 L47.173504,56.7033093 L47.173504,69.9888248 C47.173504,70.3976099 47.4783419,70.806395 47.9864052,70.806395 L98.9959573,70.806395 L98.9959573,82.8655553 L98.8943447,82.8655553 Z M107.836258,69.1712547 L48.6976938,69.1712547 L48.6976938,54.9659727 L48.6976938,37.6948025 L50.7299469,37.6948025 L71.9669915,37.6948025 C72.4750547,37.7969988 72.983118,37.7969988 73.3895686,37.6948025 L82.1282568,37.6948025 L91.476621,37.6948025 L107.836258,37.6948025 L107.836258,69.1712547 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M57.3347693,43.111205 C57.3347693,43.2134012 57.3347693,43.3155975 57.3347693,43.4177938 C57.2331567,44.6441491 56.1154175,45.6661118 54.8960657,45.6661118 C54.489615,45.6661118 54.0831644,45.9727006 54.0831644,46.483682 L54.0831644,60.4845714 C54.0831644,60.8933565 54.3880024,61.3021416 54.8960657,61.3021416 C56.2170301,61.3021416 57.3347693,62.4263006 57.3347693,63.7548522 C57.3347693,64.1636373 57.6396073,64.5724224 58.1476706,64.5724224 L98.5895067,64.5724224 C98.9959573,64.5724224 99.402408,64.2658335 99.402408,63.7548522 C99.402408,62.4263006 100.520147,61.3021416 101.841112,61.3021416 C102.247562,61.3021416 102.654013,60.9955528 102.654013,60.4845714 L102.654013,46.3814857 C102.654013,45.9727006 102.349175,45.5639155 101.841112,45.5639155 C100.520147,45.5639155 99.402408,44.4397565 99.402408,43.111205 C99.402408,42.7024199 99.09757,42.2936348 98.5895067,42.2936348 L58.0460579,42.2936348 C57.6396073,42.3958311 57.3347693,42.7024199 57.3347693,43.111205 Z M97.7766055,43.9287752 C98.0814435,45.5639155 99.3007953,46.7902708 100.926598,47.0968596 L100.926598,59.8713938 C99.3007953,60.1779826 98.0814435,61.4043379 97.7766055,63.0394783 L58.7573465,63.0394783 C58.4525085,61.4043379 57.2331567,60.1779826 55.6073542,59.8713938 L55.6073542,47.0968596 C57.2331567,46.7902708 58.4525085,45.5639155 58.7573465,43.9287752 L97.7766055,43.9287752 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M86.5992136,97.4796224 C89.1395299,97.4796224 91.2733957,95.4356969 91.2733957,92.7785938 C91.2733957,90.223687 89.2411426,88.0775652 86.5992136,88.0775652 C84.0588973,88.0775652 81.9250315,90.1214907 81.9250315,92.7785938 C82.0266442,95.3335006 84.0588973,97.4796224 86.5992136,97.4796224 Z M86.5992136,89.7127056 C88.3266287,89.7127056 89.7492059,91.1434534 89.7492059,92.8807901 C89.7492059,94.6181267 88.3266287,96.0488745 86.5992136,96.0488745 C84.8717985,96.0488745 83.4492213,94.6181267 83.4492213,92.8807901 C83.550834,91.0412571 84.8717985,89.7127056 86.5992136,89.7127056 Z' fillRule='nonzero'></Svg.Path>
                <Svg.Path fill={color} d='M22.5832418,65.0834037 L25.6316214,65.0834037 C26.038072,65.0834037 26.4445226,64.7768149 26.4445226,64.2658335 C26.4445226,63.7548522 26.038072,63.5504596 25.6316214,63.5504596 L22.5832418,63.5504596 C22.1767912,63.5504596 21.7703406,63.8570484 21.7703406,64.3680298 C21.7703406,64.8790112 22.1767912,65.0834037 22.5832418,65.0834037 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M39.9590056,65.0834037 L43.0073852,65.0834037 C43.4138358,65.0834037 43.8202864,64.7768149 43.8202864,64.2658335 C43.8202864,63.7548522 43.4138358,63.5504596 43.0073852,63.5504596 L39.9590056,63.5504596 C39.5525549,63.5504596 39.1461043,63.8570484 39.1461043,64.3680298 C39.1461043,64.8790112 39.5525549,65.0834037 39.9590056,65.0834037 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M31.2203173,65.0834037 L34.268697,65.0834037 C34.6751476,65.0834037 35.0815982,64.7768149 35.0815982,64.2658335 C35.0815982,63.7548522 34.7767602,63.5504596 34.3703096,63.5504596 L31.32193,63.5504596 C30.9154794,63.5504596 30.5090288,63.8570484 30.5090288,64.3680298 C30.5090288,64.8790112 30.8138667,65.0834037 31.2203173,65.0834037 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M76.7427862,122.006728 L79.7911658,122.006728 C80.1976164,122.006728 80.604067,121.700139 80.604067,121.189158 C80.604067,120.678176 80.2992291,120.371588 79.7911658,120.371588 L76.7427862,120.371588 C76.3363356,120.371588 75.929885,120.678176 75.929885,121.189158 C75.929885,121.700139 76.3363356,122.006728 76.7427862,122.006728 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M68.004098,122.006728 L71.0524776,122.006728 C71.4589282,122.006728 71.8653788,121.700139 71.8653788,121.189158 C71.8653788,120.678176 71.5605409,120.371588 71.0524776,120.371588 L68.004098,120.371588 C67.5976474,120.371588 67.1911967,120.678176 67.1911967,121.189158 C67.1911967,121.700139 67.5976474,122.006728 68.004098,122.006728 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M85.3798618,122.006728 L88.4282414,122.006728 C88.834692,122.006728 89.2411426,121.700139 89.2411426,121.189158 C89.2411426,120.678176 88.9363046,120.371588 88.4282414,120.371588 L85.3798618,120.371588 C84.9734111,120.371588 84.5669605,120.678176 84.5669605,121.189158 C84.5669605,121.700139 84.9734111,122.006728 85.3798618,122.006728 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M50.7299469,122.006728 L53.7783265,122.006728 C54.1847771,122.006728 54.5912277,121.700139 54.5912277,121.189158 C54.5912277,120.678176 54.2863897,120.371588 53.7783265,120.371588 L50.7299469,120.371588 C50.3234962,120.371588 49.9170456,120.678176 49.9170456,121.189158 C49.9170456,121.700139 50.3234962,122.006728 50.7299469,122.006728 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M58.6557338,121.291354 C58.6557338,121.700139 58.9605718,122.108924 59.4686351,122.108924 L62.5170147,122.108924 C62.9234653,122.108924 63.3299159,121.802335 63.3299159,121.291354 C63.3299159,120.780373 63.0250779,120.473784 62.5170147,120.473784 L59.4686351,120.473784 C58.9605718,120.473784 58.6557338,120.780373 58.6557338,121.291354 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M27.7654871,120.473784 L24.7171075,120.473784 C24.3106569,120.473784 23.9042063,120.780373 23.9042063,121.291354 C23.9042063,121.802335 24.2090442,122.108924 24.7171075,122.108924 L27.7654871,122.108924 C28.1719377,122.108924 28.5783884,121.802335 28.5783884,121.291354 C28.5783884,120.780373 28.1719377,120.473784 27.7654871,120.473784 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M45.0396382,120.473784 L41.9912586,120.473784 C41.584808,120.473784 41.1783574,120.780373 41.1783574,121.291354 C41.1783574,121.802335 41.4831954,122.108924 41.9912586,122.108924 L45.0396382,122.108924 C45.4460889,122.108924 45.8525395,121.802335 45.8525395,121.291354 C45.8525395,120.780373 45.5477015,120.473784 45.0396382,120.473784 Z' ></Svg.Path>
                <Svg.Path fill={color} d='M36.4025627,120.473784 L33.3541831,120.473784 C32.9477325,120.473784 32.5412818,120.780373 32.5412818,121.291354 C32.5412818,121.802335 32.8461198,122.108924 33.3541831,122.108924 L36.4025627,122.108924 C36.8090133,122.108924 37.2154639,121.802335 37.2154639,121.291354 C37.2154639,120.780373 36.8090133,120.473784 36.4025627,120.473784 Z' ></Svg.Path>
              </Svg.G>
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}