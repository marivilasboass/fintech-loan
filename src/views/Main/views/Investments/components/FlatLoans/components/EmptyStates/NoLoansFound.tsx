import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Spacing, View, Typography } from '~/newUI'
import NoLoansFoundIcon from './images/NoLoansFoundIcon'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Spacing.s7,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: Spacing.s9,
    marginBottom: Spacing.s3
  }
})

export default class NoLoansFound extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <NoLoansFoundIcon />
          <Typography.H3 align={'center'} style={styles.title}>Nenhum empréstimo encontrado</Typography.H3>
          <Typography.T2 align={'center'} color={Colors.warmGray}>Sugerimos alterar as configurações do seu filtro e tente novamente.</Typography.T2>
        </View>
      </React.Fragment>
    )
  }
}
