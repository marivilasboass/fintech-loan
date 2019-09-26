import React from 'react'
import { Terms, View, Spacing } from '~/newUI'

export default class AccountTerms extends React.PureComponent {
  getTermsUriByType = (type) => {
    switch (type) {
    case 'general':
      return 'https://mutual.club/Mutual.Termos.Gerais.e.Condicoes.de.uso.html'
    case 'borrower':
      return 'https://mutual.club/Mutual.Termos.e.condicoes.Tomadores.html'
    case 'investor':
      return 'https://mutual.club/Mutual.Termos.e.condicoes.Investidores.html'
    default:
      break
    }
  }

  render () {
    const { type } = this.props
    return (
      <View style={{ height: '100%', margin: Spacing.s6 }}>
        <Terms
          confirmText='Eu concordo com'
          uri={this.getTermsUriByType(type)}
          confirmed={false}
          onConfirmChanged={f => f}
          hideCheckbox
        />
      </View>
    )
  }
}
