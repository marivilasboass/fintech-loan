import React from 'react'
import { StyleSheet } from 'react-native'
import { FixedHeader, HeaderButton, View, Icon, Colors } from '~/newUI'
import ModalSelector from '~/components/ModalSelector'
import OptionsIndicator from '~/newUI/FixedHeader/components/OptionsIndicator'
import NotificationTab from './views/NotificationTab'
import { NoticesListProps } from './types'

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  }
})

export default class NoticesList extends React.PureComponent<NoticesListProps> {
  render () {
    const { navigation, markAllAsRead,  } = this.props
    return (
      <React.Fragment>
        <View style={styles.viewContainer}>
          <FixedHeader
            leftComponent={(
              <HeaderButton onPress={() => navigation.goBack()}>
                <Icon type='svg' name='ChevronLeft' color={Colors.white} />
              </HeaderButton>
            )}
            rightComponent={(
              <ModalSelector
                modalOptions={[{ label: 'Marcar todas como lidas', onPress: () => markAllAsRead() }]}
              >
                <OptionsIndicator onPress={() => {}} />
              </ModalSelector>
            )}

            centerTitle={'Notificações'}
          />
          <NotificationTab {...this.props} />
        </View>
      </React.Fragment>
    )
  }
}
