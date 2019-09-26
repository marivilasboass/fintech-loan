import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'

import { View, Text, Button, Spacing, KeyboardAwareScrollView } from '~/newUI'
import Colors from '~/newUI/Colors'

import ProgressHeader from './Headers/ProgressHeader'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s6
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Spacing.s6,
    marginBottom: Spacing.s6
  },
  actionSkip: {
    marginTop: 8
  },
  actionSkipText: {
    fontSize: 16,
    color: Colors.navyBlue
  }
})

export default class PendencyPage extends PureComponent {
  render () {
    const {
      children,
      disabled,
      preTitle,
      title,
      description,
      contentStyle,
      loading,
      onBack,
      onNext,
      onCancel,
      noScroll
    } = this.props

    const ContainerComponent = noScroll
      ? View
      : KeyboardAwareScrollView
    const containerProps = noScroll
      ? { style: styles.container }
      : { contentContainerStyle: styles.container }

    return (
      <View style={{ flex: 1 }}>
        <ProgressHeader onBack={onBack} progress={0} />
        <ContainerComponent {...containerProps}>
          <View style={styles.innerContainer}>
            <View>
              {preTitle ? <Text.H4 variant='semibold' align='center'>{preTitle}</Text.H4> : null}
              {title ? <Text.H3 align='center'>{title}</Text.H3> : null}
              {description ? <Text.T3 align='center'>{description}</Text.T3> : null}
            </View>

            <View style={[styles.content].concat(contentStyle)}>
              {children}
            </View>

            <View style={{ flex: 0 }}>
              <Button title='Próximo' onPress={onNext} disabled={disabled} loading={loading} iconRight={{ name: 'arrow-forward', size: 20 }} />
              <Button title='continuar depois' onPress={onCancel} link style={styles.actionSkip} textStyle={styles.actionSkipText} />
            </View>
          </View>
        </ContainerComponent>
      </View>
    )
  }
}
