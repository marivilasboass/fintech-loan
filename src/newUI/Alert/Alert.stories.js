import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { View, Button } from '~/newUI'

import Alert from './Alert'

storiesOf('Alert', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('basic', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.Title>
            Deseja cancelar a análise?
            </Alert.Title>
            <Alert.Button title='Sair' onPress={props.hide} />
            <Alert.Button title='Confirmar' onPress={props.hide} />
            <Alert.Description>
            Você poderá editar seus dados, mas a análise pode levar mais tempo.
            </Alert.Description>
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
  .add('with Input', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.Title>
            Precisa de ajuda?
            </Alert.Title>
            <Alert.Description>
            Digite sua dúvida e responderemos por email
            </Alert.Description>
            <Alert.Input />
            <Alert.Button title='Cancelar' onPress={props.hide} />
            <Alert.Button title='Enviar' onPress={props.hide} />
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
  .add('Photo ok', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.Title>
            Ficou ótima!
            </Alert.Title>
            <Alert.Description>
            Agora só falta o verso. Repita o mesmo processo.
            </Alert.Description>
            <Alert.Button title='Continuar' onPress={props.hide} />
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
  .add('Photo reproved', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.Title>
            Não conseguimos ler seu documento :(
            </Alert.Title>
            <Alert.Description>
            Fotografe os dois lados seguindo as instruções:
            </Alert.Description>
            <Alert.Image source={require('./images/picture-feedback-icons.png')} />
            <Alert.Instructions />
            <Alert.Button title='Tentar Novamente' onPress={props.hide} />
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
  .add('with dark header', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.DarkHeader>
              <Alert.Image source={require('./images/face-ok.png')} />
            </Alert.DarkHeader>
            <Alert.Title>
            Seu perfil foi aprovado!
            </Alert.Title>
            <Alert.Description>
            Você já pode investir seu dinheiro quando e quanto quiser.
            </Alert.Description>
            <Alert.Button title='Tentar Novamente' onPress={props.hide} />
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
  .add('with dark header and two buttons', () => (
    <Alert.Manager>
      {props => (
        <View>
          <Button secondary title='open' onPress={props.show} />
          <Alert {...props}>
            <Alert.DarkHeader>
              <Alert.Image source={require('./images/face-ok.png')} />
            </Alert.DarkHeader>
            <Alert.Title>Salvar simulação</Alert.Title>
            <Alert.Description>
              Olá, nesse momento nós iremos salvar seu pedido de empréstimo, complete seu cadastro a seguir. Caso você seja aprovado seu pedido será publicado para que você possa conseguir seu empréstimo.
            </Alert.Description>
            <Alert.Button title='Salvar e publicar' onPress={props.hide} />
            <Alert.Button title='Não salvar' onPress={props.hide} />
          </Alert>
        </View>
      )}
    </Alert.Manager>
  ))
