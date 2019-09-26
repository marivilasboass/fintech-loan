import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Typography, Spacing, Colors } from '~/newUI'

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercury,
    alignItems: 'center',
    paddingVertical: Spacing.s5
  },
  textContainer: {
    marginVertical: Spacing.s3
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '20%'
  },
  titleLabel: {
    opacity: 0.7,
    color: Colors.nightRider,
    marginBottom: 2
  }
})

export default class Address extends React.PureComponent {
  render () {
    const {
      cep,
      street, houseNumber, complement,
      neighborhood, city, state
    } = this.props

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <React.Fragment>
          <View style={styles.header}>
            <Typography.T1>Endereço</Typography.T1>
          </View>
          <View style={{ marginLeft: 20, marginVertical: Spacing.s3 }}>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>CEP</Typography.T3>
              <Typography.T2>{cep}</Typography.T2>
            </View>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>Logradouro</Typography.T3>
              <Typography.T2>{street}</Typography.T2>
            </View>
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>Número</Typography.T3>
              <Typography.T2>{houseNumber}</Typography.T2>
            </View>
            {complement
              ? (
                <View style={styles.textContainer}>
                  <Typography.T3 style={styles.titleLabel}>Complemento</Typography.T3>
                  <Typography.T2>{complement}</Typography.T2>
                </View>
              )
              : null
            }
            <View style={styles.textContainer}>
              <Typography.T3 style={styles.titleLabel}>Bairro</Typography.T3>
              <Typography.T2>{neighborhood}</Typography.T2>
            </View>
            <View style={[styles.textContainer].concat(styles.cityContainer)}>
              <View>
                <Typography.T3 style={styles.titleLabel}>Cidade</Typography.T3>
                <Typography.T2>{city}</Typography.T2>
              </View>
              <View>
                <Typography.T3 style={styles.titleLabel}>UF</Typography.T3>
                <Typography.T2>{state}</Typography.T2>
              </View>
            </View>
          </View>
        </React.Fragment>
      </ScrollView>
    )
  }
}
