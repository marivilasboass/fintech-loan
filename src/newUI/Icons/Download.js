import React from 'react'
import { Svg } from 'expo'

export default class Download extends React.PureComponent {
  static defaultProps = {
    color: '#368DF7'
  }

  render () {
    return (
      <Svg width='17' height='17' viewBox='0 0 17 17' version='1.1' {...this.props}>
        <Svg.G id='Views-&gt;-Geral' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <Svg.G id='Meus-investimentos-&gt;-Parcelas-&gt;-Detalhes-&quot;Pagamento&quot;' transform='translate(-53.000000, -616.000000)' fill={this.props.color} fillRule='nonzero'>
            <Svg.G id='•-modal' transform='translate(-10.000000, 0.000000)'>
              <Svg.G id='btn_secondary-(active)' transform='translate(30.000000, 603.000000)'>
                <Svg.G id='ico_Download' transform='translate(33.000000, 13.000000)'>
                  <Svg.G id='568036'>
                    <Svg.Path d='M16.35,12.4418605 C15.9910149,12.4418605 15.7,12.733396 15.7,13.0930233 L15.7,15.6976744 L1.3,15.6976744 L1.3,13.0930233 C1.3,12.733396 1.00898509,12.4418605 0.65,12.4418605 C0.291014913,12.4418605 0,12.733396 0,13.0930233 L0,16.3488372 C0,16.7084645 0.291014913,17 0.65,17 L16.35,17 C16.7089851,17 17,16.7084645 17,16.3488372 L17,13.0930233 C17,12.733396 16.7089851,12.4418605 16.35,12.4418605 Z' id='Shape' />
                    <Svg.Path d='M8.00925,12.395814 L8.0645,12.4446512 C8.10447665,12.4768251 8.1481134,12.5041469 8.1945,12.5260465 L8.2855,12.5553488 L8.318,12.5553488 C8.36014911,12.5594854 8.40260089,12.5594854 8.44475,12.5553488 C8.48690585,12.5593449 8.52934415,12.5593449 8.5715,12.5553488 C8.69343502,12.532216 8.80621105,12.4745973 8.8965,12.3893023 L13.31975,8.15674419 C13.5213133,8.00491398 13.6170205,7.7499892 13.5652908,7.50272393 C13.5135612,7.25545867 13.3237319,7.06048405 13.0782757,7.00250836 C12.8328196,6.94453266 12.5760412,7.03402044 12.4195,7.23209302 L9.1175,10.4423256 L9.15,0.898604651 C9.14735978,0.733480857 9.07529753,0.577137032 8.95154235,0.468037654 C8.82778717,0.358938276 8.66382696,0.307210772 8.5,0.325581395 C8.33727503,0.307294642 8.17434809,0.35816702 8.05081134,0.465836262 C7.92727458,0.573505503 7.85443754,0.72811472 7.85,0.892093023 L7.824,10.3804651 L4.574,7.21255814 C4.3164282,6.96171811 3.9046421,6.96754882 3.65425,7.2255814 C3.4038579,7.48361397 3.4096782,7.89613672 3.66725,8.14697674 L8.00925,12.395814 Z' id='Shape' />
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
