import React from 'react'

import { Terms } from '~/newUI'

import PendencyPage from '~/components/PendencyPage'

const formatComplement = (complement) => complement ? ` ${complement},` : ''

const generateTermsText = (name, cpf, address) => `
Eu, ${name}, inscrito(a) no CPF/MF  sob o nº ${cpf}, DECLARO para os devidos fins de comprovação de residência, sob as penas da Lei (art. 2º da Lei 7.115/83), que sou residente e domiciliado na ${address.street}, ${address.houseNumber},${formatComplement(address.complement)} BAIRRO ${address.neighborhood}, CEP ${address.cep}, na cidade de ${address.city}, Estado ${address.state}, conforme cópia de comprovante anexo.
Declaro ainda, estar ciente de que declaração falsa pode implicar na sanção penal prevista no art. 299 do Código Penal, in verbis:

“Art. 299 – Omitir, em documento público ou particular, declaração que nele deveria constar, ou nele inserir ou fazer inserir declaração falsa ou diversa da que devia ser escrita, com o fim de prejudicar direito, criar obrigação ou alterar a verdade sobre o fato juridicamente relevante.
Pena: reclusão de 1 (um) a 5 (cinco) anos e multa, se o documento é público e reclusão de 1 (um) a 3 (três) anos, se o documento é particular.”
`

export default class TermsView extends React.Component {
  state = {
    confirmed: false
  }

  static defaultProps = {
    onNext: () => { throw new Error('AddressOwnerView expects an onNext prop') },
    onCancel: () => { throw new Error('AddressOwnerView expects an onCancel prop') }
  }

  render () {
    const { confirmed } = this.state
    const { disabled, name, cpf, address, onCancel, ...otherProps } = this.props

    return (
      <PendencyPage
        noScroll
        title='Para utilizar comprovantes de terceiros, precisamos que você aceite o termo abaixo:'
        disabled={disabled || !confirmed}
        {...otherProps}
      >
        <Terms
          confirmed={confirmed}
          onConfirmChanged={(confirmed) => this.setState({ confirmed })}
          confirmText='Sim, estou de acordo com a declaração'
        >
          {generateTermsText(name, cpf, address)}
        </Terms>
      </PendencyPage>
    )
  }
}
