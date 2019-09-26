import React from 'react'

import { StyleSheet } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { View, Text, ListItem, Spacing, Colors, Button } from '~/newUI'

import BottomSheet from './BottomSheet'
import BottomSheetManager from './bottomSheetManager'

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingTop: Spacing.s7,
    paddingBottom: Spacing.s10,
    paddingLeft: Spacing.s6,
    paddingRight: Spacing.s7
  },

  partition: {
    backgroundColor: Colors.lineGray,
    height: 1,
    marginVertical: Spacing.s4
  }
})

storiesOf('BottomSheet', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('basic', () => (
    <BottomSheetManager>
      {props => (
        <View style={{ flexGrow: 1 }}>
          <Button onPress={props.toggle} title='abrir bottom sheet' />
          <BottomSheet active={props.isVisible} onPress={props.toggle}>
            <View style={styles.bottomSheetContainer}>
              <Text.T2> Investimento de alto risco</Text.T2>
              <ListItem>Score B</ListItem>
              <ListItem>1 a cada 10 pessoas não pagarão</ListItem>
              <ListItem>Nome limpo, sem restrição no SPC e Banco Central.</ListItem>
              <View style={styles.partition} />
              <ListItem>
                Faixa mensal de <Text format='currencyRounded'>1000</Text> - <Text format='currencyRounded'>20000</Text>.
              </ListItem>
              <ListItem>Um texto bonito qualquer</ListItem>
              <ListItem>Após esse empréstimo terá <Text format='percentageRounded'>15</Text> da renda declarada comprometida.</ListItem>
            </View>
          </BottomSheet>
        </View>
      )}
    </BottomSheetManager>
  ))
