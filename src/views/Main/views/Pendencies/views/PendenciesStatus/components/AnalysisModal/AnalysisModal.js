import React from 'react'
import { StyleSheet } from 'react-native'

import { Modal, Text, Colors, Spacing, Icon, View, Button } from '~/newUI'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.s6
  },

  container: {
    margin: 0,
    backgroundColor: Colors.marineBlue,
    padding: Spacing.s6
  },

  content: {
    alignItems: 'center',
    flex: 1
  },

  title: {
    marginBottom: Spacing.s12
  },

  subTitle: {
    marginTop: Spacing.s12
  }
})

export default class AnalysisModal extends React.PureComponent {
  render () {
    const { showButtons, onExit, style, ...otherProps } = this.props

    return (
      <Modal style={[styles.container].concat(style)} {...otherProps}>
        <View style={styles.header}>
          {showButtons && (
            <Icon type='feather' name='x' color={Colors.white} underlayColor='transparent' onPress={onExit} />
          )}
        </View>

        <View style={styles.content}>
          <Text.H3 style={styles.title} color={Colors.white} align='center'>Vamos analisar os seus dados</Text.H3>

          <Icon type='svg' name='Hourglass' color={Colors.white} />

          <Text.T3 style={styles.subTitle} color={Colors.white} align='center'>Isso pode levar até 24h/úteis</Text.T3>
        </View>

        {showButtons && (
          <Button title='Ver pedidos de empréstimo' onPress={onExit} />
        ) }
      </Modal>
    )
  }
}
