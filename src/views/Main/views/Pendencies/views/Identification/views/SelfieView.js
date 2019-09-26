import React from 'react'
import { StyleSheet } from 'react-native'

import { Message, View, Spacing } from '~/newUI'

import PendencyPage from '~/components/PendencyPage'
import PictureInstructionsCard from '../../../components/PictureInstructionsCard'
import PicturePreview from '../../../components/PicturePreview'

const styles = StyleSheet.create({
  message: {
    marginBottom: Spacing.s6
  }
})

export default class SelfieView extends React.PureComponent {
  static defaultProps = {
    onTakePicture: () => { throw new Error('SelfieView expects a prop onTakePicture') }
  }

  render () {
    const { disabled, selfie, onTakePicture, errorTitle, errorMessage, ...props } = this.props

    return (
      <PendencyPage
        title='Tire a sua selfie :)'
        preTitle='Para começar'
        disabled={disabled || !selfie}
        {...props}
      >
        {selfie ? (
          <PicturePreview type='selfie' pictures={[selfie]} onEdit={onTakePicture} />
        ) : (
          <View>
            {errorTitle && errorMessage && (
              <Message style={styles.message} title={errorTitle} variant='error'>
                {errorMessage}
              </Message>
            )}

            <PictureInstructionsCard
              title='Foto do perfil'
              message='Tire uma selfie para o seu perfil seguindo essas instruções:'
              onPress={onTakePicture}
            >
              <PictureInstructionsCard.IconWithText text='Em local claro' icon='Lamp' />
              <PictureInstructionsCard.IconWithText text='Sem acessórios' icon='Glasses' />
              <PictureInstructionsCard.IconWithText text='De frente' icon='Selfie' />
            </PictureInstructionsCard>
          </View>
        )}

      </PendencyPage>
    )
  }
}
