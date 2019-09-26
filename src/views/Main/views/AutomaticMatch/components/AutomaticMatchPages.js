import React from 'react'
import { StyleSheet } from 'react-native'

import { Typography, Spacing, Colors } from '~/newUI'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.s2
  }
})

export default class AutomaticMatchPages extends React.PureComponent {
  render () {
    const {
      onBack, rightComponent: StepCounter, fixedHeaderSize,
      backgroundType, title, subtitle, buttonProps, children,
      disabled, onAdvance, btnText, contentStyle, headerStyle,
      loading, buttonBorder
    } = this.props

    const titleColor = backgroundType !== 'fixed' ? Colors.nightRider : Colors.white

    return (
      <ViewWithHeaderAndButton
        fixedHeaderSize={fixedHeaderSize}
        onPressBack={onBack}
        rightComponent={(<StepCounter />)}
        backgroundType={backgroundType}
        buttonBorder={buttonBorder}
      >
        <ViewWithHeaderAndButton.Header style={headerStyle}>
          <React.Fragment>
            <Typography.H3 color={titleColor} style={styles.title} align='center'>{title}</Typography.H3>
            <Typography.T2 color={titleColor} align='center'>{subtitle}</Typography.T2>
          </React.Fragment>
        </ViewWithHeaderAndButton.Header>
        <ViewWithHeaderAndButton.Content style={contentStyle}>
          {children}
        </ViewWithHeaderAndButton.Content>
        <ViewWithHeaderAndButton.Button {...buttonProps} loading={loading} disabled={disabled} onPress={onAdvance} title={btnText || 'Continuar'} />
      </ViewWithHeaderAndButton>
    )
  }
}
