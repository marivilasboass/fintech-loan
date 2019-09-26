import React from 'react'
import { Svg } from 'expo'

import { Colors } from '~/newUI'

export default class RGFrontImage extends React.PureComponent {
  render () {
    const width = 378
    const height = 600
    const scale = 0.666

    return (
      <Svg width={width * scale} height={height * scale} viewBox='0 0 378 600' xmlns='http://www.w3.org/2000/svg' {...this.props}>
        <Svg.G id='Mask---RG/CNH' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.Rect id='Rectangle' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='1' y='1' width='376' height='598' />
          <Svg.G id='Group-5' transform='translate(96.000000, 53.000000)' fill='none'>
            <Svg.Rect id='Rectangle-2' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='1' y='1' width='184' height='238' />
            <Svg.Rect id='Rectangle-2-Copy' strokeOpacity='0.5' stroke={Colors.white} strokeWidth='2' x='1' y='269' width='184' height='238' />
            <Svg.G id='noun_737678_cc' transform='translate(95.013659, 130.791636) rotate(1.000000) translate(-95.013659, -130.791636) translate(34.513659, 43.791636)' fillRule='nonzero' stroke={Colors.white} strokeOpacity='0.5' strokeWidth='2' fill='none'>
              <Svg.G id='Group' fill='none'>
                <Svg.Path d='M25.076531,35.7759994 C25.076531,55.3187152 40.9490082,71.1700291 60.5178157,71.1700291 C80.0866232,71.1700291 95.9591004,55.3187152 95.9591004,35.7759994 C95.9591004,16.2332836 80.0866232,0.164828466 60.5178157,0.164828466 C40.9490082,0.164828466 25.076531,16.0161424 25.076531,35.7759994 Z' id='Shape' />
                <Svg.Path d='M60.5178157,78.1185502 C27.9031365,78.1185502 1.37653079,104.609787 1.37653079,137.18098 L0.0499111957,154.213232 C13.7480764,162.898883 33.4298694,173.166811 56.9124384,173.166811 C80.3950074,173.166811 106.46531,162.672959 120.163475,153.987308 L119.659101,137.18098 C119.659101,104.609787 93.1324949,78.1185502 60.5178157,78.1185502 Z' id='Shape' />
              </Svg.G>
            </Svg.G>
            <Svg.G id='noun_Fingerprint_1281085' transform='translate(37.000000, 317.000000)' fill={Colors.white} fillOpacity='0.5' fillRule='nonzero'>
              <Svg.Path d='M95.2538636,110.421933 C92.7321608,121.290778 89.4013861,131.956395 85.2893182,142.329834 C83.9795455,143.381461 82.7211364,144.381789 81.2829545,145.279519 C86.1127468,133.813972 89.9449349,121.954316 92.7370455,109.831996 C97.4460257,89.8369794 85.0337818,69.8152457 65.0135226,65.1122024 C44.9932634,60.4091591 24.9462536,72.8057529 20.2372727,92.8007698 C18.1015319,102.537883 14.8708031,112.002739 10.6065909,121.015151 C10.1100758,120.074672 9.62212121,119.117093 9.14272727,118.142414 C12.8734857,109.810827 15.7474707,101.122397 17.7204545,92.2108327 C22.75566,70.834651 44.1881958,57.5825257 65.5913635,62.6113822 C86.9945312,67.6402388 100.263387,89.0457516 95.2281818,110.421933 L95.2538636,110.421933 Z M60.3265909,85.0802891 C56.0149336,84.0645626 51.4758425,84.8021548 47.7089822,87.1306224 C43.9421219,89.45909 41.2564374,93.1874601 40.2434091,97.4946169 C37.1879849,112.159538 31.7022543,126.212002 24.0125,139.072355 L25.8102273,140.713919 C33.8496999,127.574634 39.574065,113.15597 42.7345455,98.084554 C44.5216887,90.4987717 52.1277094,85.7962193 59.7230682,87.5811092 C67.318427,89.3659992 72.026916,96.96243 70.2397727,104.548212 C66.4960486,121.476954 60.1915835,137.737189 51.5434091,152.769155 C52.502197,152.888852 53.4781061,152.965801 54.4711364,153 C62.9149233,138.045434 69.0697132,121.912723 72.7309091,105.138149 C74.8502789,96.1784614 69.2971205,87.1989695 60.3265909,85.0802891 Z M63.845,70.1010175 C46.6168458,66.0942652 29.3897437,76.7616018 25.3222727,93.9549945 C22.8868803,105.188001 18.965968,116.047483 13.6627273,126.247637 C14.1763636,127.068419 14.7071212,127.872101 15.255,128.658684 C21.0178553,117.89896 25.2285434,106.379503 27.7620455,94.4423338 C30.1797185,84.1836148 37.8936113,75.9923545 47.9979749,72.9541214 C58.1023385,69.9158883 69.0620798,72.4922623 76.7487703,79.7127482 C84.4354608,86.9332341 87.6813094,97.7008684 85.2636364,107.959587 C81.9390247,122.697464 76.9415523,137.008358 70.3681818,150.614602 C71.5495455,150.204211 72.7309091,149.742521 73.8865909,149.229533 C79.9239592,136.192392 84.5722343,122.557449 87.7547727,108.549525 C91.7489715,91.3436829 81.0580875,74.1520294 63.845,70.1010175 Z M58.5545455,92.5699249 C56.231789,92.0238752 53.7869561,92.4226675 51.7588448,93.6784149 C49.7307334,94.9341623 48.2858064,96.9437959 47.7425,99.2644281 C44.3951993,115.104415 38.3119268,130.241344 29.7652273,143.997047 C30.4586364,144.510036 31.1777273,144.997375 31.8968182,145.484715 C40.6282876,131.44774 46.8421822,115.997689 50.2593182,99.8287157 C51.0677877,96.3793451 54.5229793,94.2376454 57.9767045,95.0450956 C61.4304298,95.8525458 63.5748332,99.3033809 62.7663636,102.752752 C59.0927484,119.797811 52.6375268,136.123488 43.6590909,151.076292 L46.0218182,151.743178 C54.9556705,136.747318 61.4158572,120.413693 65.1547727,103.368338 C66.2993955,98.5690351 63.3518012,93.7465737 58.5545455,92.5699249 Z M56.7825,100.059561 C56.0949708,99.8989905 55.4066233,100.322936 55.2415909,101.00859 C51.7224006,117.649551 45.3633183,133.561918 36.4425,148.049659 C37.2129545,148.46005 38.0090909,148.819142 38.8052273,149.178234 C47.7693552,134.495389 54.1696546,118.397726 57.7327273,101.572877 C57.8776231,100.89484 57.456741,100.22455 56.7825,100.059561 Z M77.97,4.92579634 C74.6080203,3.02638377 71.0180756,1.56118873 67.2863636,0.56539194 C60.192522,-0.18846398 53.0386144,-0.18846398 45.9447727,0.56539194 C42.1596063,1.54772439 38.5170156,3.0132686 35.1070455,4.92579634 C49.2210685,1.77969285 63.855977,1.77969285 77.97,4.92579634 Z M62.0986364,77.5906533 C55.7980775,76.1052486 49.1647272,77.1816404 43.6591177,80.5828286 C38.1535082,83.9840169 34.2270669,89.4311242 32.7443182,95.7248057 C30.9465909,103.419637 27.1456818,119.424886 18.645,133.249933 C19.21,133.951018 19.7921212,134.643552 20.3913636,135.327537 C29.4056818,120.989502 33.3606818,104.291718 35.2354545,96.3403922 C37.0200366,88.7574622 42.7196106,82.7014087 50.1872021,80.4534886 C57.6547935,78.2055685 65.7558977,80.1072943 71.4389069,85.4423043 C77.1219161,90.7773143 79.523446,98.7350935 77.7388636,106.318023 C74.1535244,122.550027 68.3552916,138.213997 60.5063636,152.871753 C61.5678788,152.769155 62.6208333,152.623808 63.6652273,152.435712 C71.1494267,138.042827 76.7264075,122.738401 80.2556818,106.907961 C81.7429617,100.615346 80.665211,93.9903589 77.259729,88.4916911 C73.854247,82.9930232 68.4002631,79.0715325 62.0986364,77.5906533 Z M75.6072727,20.0589646 C85.2816826,22.3515105 94.4667194,26.3562105 102.727273,31.8833553 C101.905455,30.2930902 101.057955,28.7284745 100.159091,27.2408071 C73.2126782,11.4040861 39.7873218,11.4040861 12.8409091,27.2408071 C11.9420455,28.7284745 11.0945455,30.2930902 10.2727273,31.8577059 C29.4673263,19.038702 53.13337,14.7648599 75.6072727,20.0589646 Z M77.3793182,12.5693288 C82.9582531,13.8867864 88.4010044,15.7245118 93.6359091,18.0583084 C92.3175758,16.5022425 90.9478788,15.023125 89.5268182,13.6209557 C85.745761,12.1948779 81.8769798,11.0125749 77.9443182,10.0813333 C59.843146,5.83155824 40.8832841,7.08204595 23.4988636,13.6722546 C22.0606818,15.0744238 20.6824242,16.570641 19.3640909,18.1609062 C37.5716343,10.0080828 57.9628006,8.07881863 77.3793182,12.6719265 L77.3793182,12.5693288 Z M73.8609091,27.7537959 C86.9045461,30.7745448 98.9070884,37.2109158 108.634091,46.4009371 C108.120455,44.7080742 107.555455,43.0665102 106.939091,41.4505956 C77.7922512,16.9361929 35.2077488,16.9361929 6.06090909,41.4505956 C5.47022727,43.0665102 4.87954545,44.7337236 4.36590909,46.4009371 C22.8991219,28.8765575 49.029559,21.8651473 73.8609091,27.7537959 Z M67.3890909,55.1217459 C55.1251498,52.2363056 42.2157763,54.3370182 31.5032507,60.9613657 C20.7907251,67.5857133 13.1533742,78.1905615 10.2727273,90.4410215 C8.92085388,96.3883425 7.20552118,102.247384 5.13636364,107.985237 C5.54727273,109.21641 5.98386364,110.439033 6.44613636,111.653106 C9.08651194,104.984254 11.2156718,98.1246562 12.8152273,91.1335563 C16.3006853,75.3277402 28.0358834,62.6198292 43.5286758,57.8743161 C59.0214682,53.128803 75.872509,57.0806185 87.6313462,68.2170374 C99.3901834,79.3534562 104.235743,95.9497975 100.313182,111.653106 C98.533,119.195402 96.3729822,126.643204 93.8413636,133.968117 C95.5739734,131.890306 97.186007,129.715091 98.6695455,127.45316 C100.313182,122.092428 101.674318,116.96254 102.804318,112.243044 C105.70784,99.9768297 103.605689,87.0608734 96.9616384,76.3446693 C90.3175877,65.6284653 79.6776147,57.9926222 67.3890909,55.1217459 Z M69.1611364,47.6321101 C39.4850588,40.6754509 9.77555827,59.0411247 2.77363636,88.6712103 C2.43977273,90.1075788 2.00318182,91.8004417 1.51522727,93.6472012 C1.82340909,95.5196102 2.18295455,97.3407203 2.59386364,99.1618303 C3.6725,95.6222079 4.57136364,92.2364822 5.16204545,89.2611474 C11.3862603,62.6151121 37.0395055,45.1964408 64.1383721,49.2159506 C91.2372387,53.2354604 110.714658,77.3482548 108.916591,104.65081 C109.867025,101.401963 110.6471,98.1058056 111.253636,94.7757765 C108.505455,71.7933666 91.6863094,52.9673834 69.1354545,47.6321101 L69.1611364,47.6321101 Z M113,73.5636915 C102.432362,52.0281287 80.5130624,38.3776117 56.5,38.3776117 C32.4869376,38.3776117 10.5676384,52.0281287 0,73.5636915 C0,74.410123 0,75.2565544 0,76.1286353 C0,77.4282068 0,78.7106787 0,79.976051 C8.89724531,56.5699265 31.3552115,41.0935793 56.4229545,41.0935793 C81.4906976,41.0935793 103.948664,56.5699265 112.845909,79.976051 C112.845909,78.7106787 112.845909,77.4453064 112.845909,76.1799342 C113,75.2565544 113,74.410123 113,73.5636915 Z M72.1402273,35.089535 C88.3003313,38.8900962 102.50157,48.4825564 112.049773,62.047094 C111.792955,60.225984 111.536136,58.4305233 111.176591,56.6863616 C97.7631189,40.3009355 77.6915484,30.7970764 56.5,30.7970764 C35.3084516,30.7970764 15.2368811,40.3009355 1.82340909,56.6863616 C1.48954545,58.4561728 1.20704545,60.2516334 0.950227273,62.0727435 C16.9605665,39.4664068 45.0973415,28.8142897 72.0888636,35.1408339 L72.1402273,35.089535 Z' id='Shape' />
            </Svg.G>
          </Svg.G>
        </Svg.G>
      </Svg>
    )
  }
}