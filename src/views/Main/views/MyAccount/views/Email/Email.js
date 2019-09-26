import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Typography, Spacing, Colors, Message, Button, Modal } from '~/newUI'
import EmailAlteration from './components/EmailAlteration'
import { formatDatetime } from '~/utils/dateTimeHelpers'

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercury,
    alignItems: 'center',
    paddingVertical: Spacing.s5
  },
  textContainer: {
    marginTop: Spacing.s6
  },
  titleLabel: {
    opacity: 0.7,
    color: Colors.nightRider,
    marginBottom: 2
  },
  message: {
    marginVertical: Spacing.s7,
    marginHorizontal: Spacing.s6,
    height: 64,
    alignItems: 'center'
  },
  button: {
    borderRadius: 0,
    backgroundColor: Colors.brightBlue,
    height: 48,
    marginBottom: 1
  }
})

export default class Address extends React.PureComponent {
  state = {
    showModal: false
  }

  handleModalVisibility = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    const { email, oldEmails } = this.props
    const { showModal } = this.state
    const lastEmailChange = oldEmails && oldEmails.length && oldEmails[oldEmails.length - 1].updatedAt
    const formattedDateTime = formatDatetime(lastEmailChange)
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <React.Fragment>
          <View style={styles.header}>
            <Typography.T1>E-mail</Typography.T1>
          </View>
          <View style={{ marginLeft: 20, marginVertical: Spacing.s3 }}>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>E-mail</Typography.T3>
              <Typography.T2>{email}</Typography.T2>
            </View>
            {lastEmailChange
              ? (
                <View style={styles.textContainer}>
                  <Typography.T3 style={styles.titleLabel}>Alterado em</Typography.T3>
                  <Typography.T2>{formattedDateTime}</Typography.T2>
                </View>
              )
              : null
            }
          </View>
          <Message style={styles.message} variant={'info'}>
            <Typography.T3 style={{ textAlign: 'center' }}>
              Mantenha o seu e-mail sempre atualizado, se possível verifique sua caixa de spam (lixo).
            </Typography.T3>
          </Message>
          <Button onPress={this.handleModalVisibility} title={'Editar meu e-mail'} style={styles.button} textStyle={{ fontSize: 16 }} />
          <Modal hideCloseIcon isVisible={showModal} fullscreen>
            <EmailAlteration {...this.props} onClose={this.handleModalVisibility} />
          </Modal>
        </React.Fragment>
      </ScrollView>
    )
  }
}
