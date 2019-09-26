import React from 'react'

import Terms from '~/components/Terms'

export default class SecondTerm extends React.Component {
  render () {
    return (
      <Terms
        description='Eu concordo com a Procuração para Representação Junto A Instituição Financeira.'
        uri='http://mutual.club/procuracao.investidor.html'
        {...this.props}
      />
    )
  }
}
