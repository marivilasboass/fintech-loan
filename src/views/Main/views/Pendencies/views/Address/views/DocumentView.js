import React from 'react'
import { StyleSheet } from 'react-native'

import { Selector, View, Message, Spacing } from '~/newUI'
import PendencyPage from '~/components/PendencyPage'

import PictureInstructionsCard from '../../../components/PictureInstructionsCard'
import PicturePreview from '../../../components/PicturePreview'

const styles = StyleSheet.create({
  message: {
    marginBottom: Spacing.s6
  }
})

const documentTypeOptions = [
  { value: 'light', label: 'Conta de luz' },
  { value: 'water', label: 'Conta de água' },
  { value: 'phone', label: 'Conta de telefone' },
  { value: 'tv', label: 'Conta de TV por assinatura' },
  { value: 'healthInsurance', label: 'Conta de plano de saúde' },
  { value: 'creditCard', label: 'Fatura do cartão' }
]
export default class DocumentView extends React.Component {
  static defaultProps = {
    onNext: () => { throw new Error('DocumentView expects a prop onNext') },
    onCancel: () => { throw new Error('DocumentView expects a prop onCancel') },
    onTakePicture: () => { throw new Error('DocumentView expects a prop onTakePicture') },
    onDocumentTypeSelected: () => { throw new Error('DocumentView expects a prop onDocumentTypeSelected') }
  }

  state = { showDocumentPicker: false }

  hideOptions = () => {
    this.setState({ showDocumentPicker: false })
  }

  render () {
    const { errorTitle, errorMessage, document, onDocumentTypeSelected, onTakePicture, ...otherProps } = this.props
    const { showDocumentPicker } = this.state

    return (
      <PendencyPage
        title='Nos envie um comprovante de residência'
        description='Ele precisa estar no seu nome ou no nome dos seus pais'
        disabled={!document}
        {...otherProps}
      >
        <Selector.Options
          modalVisible={showDocumentPicker}
          toggleSelector={this.hideOptions}
          onChange={onDocumentTypeSelected}
          data={documentTypeOptions}
        />
        {document ? (
          <PicturePreview type='address' pictures={[document]} onEdit={onTakePicture} />
        ) : (
          <View>
            {errorTitle && errorMessage && (
              <Message style={styles.message} title={errorTitle} variant='error'>
                {errorMessage}
              </Message>
            )}
            <PictureInstructionsCard
              title='Comprovante de residência'
              message='Conta de luz, água, telefone, fatura do cartão, tv a cabo e plano de saúde dos últimos 3 meses'
              onPress={() => { this.setState({ showDocumentPicker: true }) }}
            />
          </View>
        )}

      </PendencyPage>
    )
  }
}
