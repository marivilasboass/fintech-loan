import React, { Component } from 'react'
import { Input } from '~/newUI'

import PendencyPage from '~/components/PendencyPage'

export default class PersonalView extends Component {
    state = { income: 'RS0,00' }

    handleIncome = (value) => {
      this.setState({ income: value })
    }

    render () {
      const { income } = this.state

      return (
        <PendencyPage
          title='Qual é a sua renda?'
          description='Informe apenas o valor que pode ser comprovado'
          disabled={!income || income === 'R$0,00'}>
          <Input mask='money' autoFocus value={income} label='Renda' onChange={this.handleIncome} />
        </PendencyPage>
      )
    }
}
