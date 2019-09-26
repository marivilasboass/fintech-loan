import React from 'react'

import Terms from '~/components/Terms'

export default class FirstTerm extends React.Component {
  render () {
    return (
      <Terms
        description='Eu concordo com os Termos e Condições de Uso para Investidores'
        uri='http://mutual.club/Mutual.Termos.e.condicoes.Investidores.html'
        {...this.props}
      />
    )
  }
}
