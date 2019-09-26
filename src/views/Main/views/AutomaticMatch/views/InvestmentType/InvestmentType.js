import React from 'react'

import { View, RadioGroup } from '~/newUI'
import AutomaticMatchPages from '../../components/AutomaticMatchPages'

const radioOptions = [
  {
    label: 'Somente um pedido de empréstimo',
    value: false
  },
  {
    label: 'Diversos pedidos de empréstimo',
    value: true
  }
]

export default class InvestmentType extends React.PureComponent {
  state = {
    autoMatching: null,
    loading: false
  }

  setAutoMatch = ({ value }) => this.setState({ autoMatching: value })

  onAdvance = async () => {
    const { autoMatching } = this.state
    const { onAdvance, navigation } = this.props
    if (!autoMatching) {
      navigation.navigate('Investments')
      return
    }
    onAdvance()
  }

  render () {
    const { nickname, ...otherProps } = this.props
    const { autoMatching, loading } = this.state
    return (
      <AutomaticMatchPages
        {...otherProps}
        title='Quero realizar um novo investimento'
        subtitle={`Ótima ideia ${nickname}! Como deseja investir o seu dinheiro na Mutual?`}
        disabled={typeof autoMatching !== 'boolean'}
        loading={loading}
        onAdvance={this.onAdvance}
      >
        <View>
          <RadioGroup
            items={radioOptions}
            value={autoMatching}
            onChange={this.setAutoMatch}
          />
        </View>
      </AutomaticMatchPages>
    )
  }
}
