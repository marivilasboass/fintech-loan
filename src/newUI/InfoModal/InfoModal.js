import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Typography from '../Typography'
import View from '../View'
import BottomSheet from '../BottomSheet'
import Spacing from '../Spacing'
import Button from '../Button'

import { HeaderComponent } from '~/components/AdvancedFilter/components'

const styles = StyleSheet.create({
  descriptionContainer: {
    margin: Spacing.s6,
    alignItems: 'center'
  }
})

export default class InfoModal extends React.PureComponent {
  onFilter = () => {
    this.props.onClose()
  }

  render () {
    const { visible, info, onClose } = this.props
    const { title, text } = info
    return (
      <BottomSheet active={visible} onPress={onClose}>
        <View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <React.Fragment>
              <HeaderComponent
                leftComponent={{
                  text: ''
                }}
                title={title}
                rightComponent={{
                  text: ''
                }}
              />
              <View style={styles.descriptionContainer}>
                <Typography.T2>{text}</Typography.T2>
              </View>
              <Button secondary style={{ marginHorizontal: Spacing.s15, marginBottom: Spacing.s6 }} onPress={onClose} title='Entendi' />
            </React.Fragment>
          </ScrollView>
        </View>
      </BottomSheet>

    )
  }
}
