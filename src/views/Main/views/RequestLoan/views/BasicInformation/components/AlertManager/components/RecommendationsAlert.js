import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Alert } from '~/newUI'
import moneyArrowsImage from '../images/money-arrows.png'

const styles = StyleSheet.create({
  image: {
    marginBottom: 20
  }
})

export default class RecommendationsAlert extends React.PureComponent {
  render () {
    const { onRequestClose, onAccept, ...otherProps } = this.props

    return (
      <Alert {...otherProps}>
        <Alert.CloseButton color={Colors.brightBlue} onPress={onRequestClose} />
        <Alert.Image source={moneyArrowsImage} imageStyle={styles.image} />
        <Alert.Title>
          Essas condições não foram aprovadas para o seu perfil
        </Alert.Title>
        <Alert.Description>
          Mas não se preocupe, ainda temos algumas recomendações que podem te ajudar.
        </Alert.Description>
        <Alert.Button title='Ver recomendações' onPress={onAccept} />
      </Alert>
    )
  }
}
