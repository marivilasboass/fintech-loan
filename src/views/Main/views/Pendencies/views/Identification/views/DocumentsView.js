import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, Selector, Colors, View, Message, Spacing } from '~/newUI'

import PendencyPage from '~/components/PendencyPage'
import PictureInstructionsCard from '../../../components/PictureInstructionsCard'
import PicturePreview from '../../../components/PicturePreview'
import DocumentModalTips from '../components/DocumentModalTips'

const styles = StyleSheet.create({
  message: {
    marginBottom: Spacing.s6
  }
})

export default class DocumentsView extends React.Component {
  static defaultProps = {
    onTakePicture: () => { throw new Error('DocumentView expects a prop onTakePicture') },
    onDocumentTypeSelected: () => { throw new Error('DocumentView expects a prop onDocumentTypeSelected') }
  }

  state = {
    showDocumentPicker: false,
    showTipsModal: false,
    document: ''
  }

  hideOptions = () => {
    this.setState({ showDocumentPicker: false })
  }

  selectDocument = ({ value }) => {
    this.setState({ document: value })
  }

  openTipsModal = () => {
    this.setState({ showTipsModal: true })
  }

  closeModalTips = () => {
    this.setState({ showTipsModal: false })
  }

  closeAndAdvance = () => {
    this.closeModalTips()
    this.props.onDocumentTypeSelected({ value: this.state.document })
  }

  render () {
    const { disabled, front, back, onDocumentTypeSelected, onTakePicture, errorTitle, errorMessage, ...otherProps } = this.props
    const { showDocumentPicker, showTipsModal } = this.state

    const contentStyle = front && back ? ({}) : ({
      justifyContent: 'flex-start',
      paddingTop: Spacing.s10
    })

    return (
      <PendencyPage
        preTitle='Precisamos do seu'
        title='Documento de identificação'
        disabled={disabled || !front || !back}
        contentStyle={contentStyle}
        {...otherProps}
      >
        <Selector.Options
          modalVisible={showDocumentPicker}
          toggleSelector={this.hideOptions}
          onChange={this.selectDocument}
          onModalHide={this.openTipsModal}
          data={[{ value: 'cnh', label: 'CNH' }, { value: 'rg', label: 'RG' }]}
        />

        {front && back ? (
          <PicturePreview type='document' pictures={[front, back]} onEdit={onTakePicture} />
        ) : (
          <View>
            {errorTitle && errorMessage && (
              <Message style={styles.message} title={errorTitle} variant='error'>
                {errorMessage}
              </Message>
            )}

            <PictureInstructionsCard
              title='CNH ou RG'
              buttonStyle={{ marginTop: Spacing.s7 }}
              message={<React.Fragment>Fotografe <Text.T3 variant='bold' color={Colors.primary}>frente e verso</Text.T3> do seu documento</React.Fragment>}
              onPress={() => { this.setState({ showDocumentPicker: true }) }}
            />

            <DocumentModalTips
              isVisible={showTipsModal}
              onAdvance={this.closeAndAdvance}
              onClose={this.closeModalTips}
            />
          </View>
        )}

      </PendencyPage>
    )
  }
}
