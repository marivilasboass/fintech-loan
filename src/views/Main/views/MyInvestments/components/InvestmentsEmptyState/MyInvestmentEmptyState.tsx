import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Spacing, View, Typography } from '~/newUI'
import EmptyInvestmentsIcon from './images/EmptyInvestmentsIcon'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Spacing.s7,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: Spacing.s10,
    marginBottom: Spacing.s3
  }
})

export default class MyInvestmentsEmptyState extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <EmptyInvestmentsIcon />
          <Typography.H3 style={styles.title}>Sem investimentos</Typography.H3>
          <Typography.T2 align={'center'} color={Colors.warmGray}>Vamos lá, aproveite para realizar o seu primeiro investimento.</Typography.T2>
        </View>
      </React.Fragment>
    )
  }
}
