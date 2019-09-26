import React from 'react'
import { StyleSheet } from 'react-native'
import { Typography, Spacing, Message, View, Colors, Row } from '~/newUI'
import ViewWithHeaderAndButton from '~/components/ViewWithHeaderAndButton'
import FullScreenModalCloseIcon from '~/newUI/Modal/components/FullScreenModalCloseIcon'

const styles = StyleSheet.create({
  titleText: {
    marginBottom: Spacing.s3
  },
  contentContainer: {
    justifyContent: 'space-between'
  },
  message: {
    marginTop: Spacing.s6
  },
  progressText: {
    position: 'absolute',
    right: Spacing.s6
  },
  balance: {
    justifyContent: 'center'
  },
  hideDescription: {
    paddingBottom: 0
  }
})

export default class QuestionPage extends React.PureComponent {
  static defaultProps = {
    buttonText: 'Continuar'
  }

  renderHint = () => {
    const { plainHint, hint } = this.props
    if (plainHint) {
      return (
        <Row style={styles.balance}>
          <Typography.T2 color={Colors.warmGray}>{hint}</Typography.T2>
        </Row>
      )
    }
    return (
      <Message variant='info' style={styles.message}><Typography.T3>{hint}</Typography.T3></Message>
    )
  }

  render () {
    const { title, description, hint, hideDescription, backButtonIcon, canContinue, onBack, children, currentStep, totalSteps, onContinue, loading, buttonStyle, buttonText, textStyle } = this.props

    return (
      <ViewWithHeaderAndButton
        onPressBack={onBack}
        backIcon={backButtonIcon && <FullScreenModalCloseIcon />}
        rightIcon={currentStep && totalSteps && <Typography.T2 color={Colors.warmGray} style={styles.progressText}>Etapa {currentStep} de {totalSteps}</Typography.T2>}
        backgroundType='none'
      >
        <ViewWithHeaderAndButton.Header style={hideDescription && styles.hideDescription}>
          <Typography.H3 align='center' style={!hideDescription && styles.titleText}>{title}</Typography.H3>

          { !hideDescription && <Typography.T2 align='center'>{description}</Typography.T2>}
        </ViewWithHeaderAndButton.Header>

        <ViewWithHeaderAndButton.Content style={styles.contentContainer}>
          <View>{children}</View>

          {hint && this.renderHint()}
        </ViewWithHeaderAndButton.Content>

        <ViewWithHeaderAndButton.Button
          disabled={!canContinue}
          title={buttonText}
          style={canContinue && buttonStyle}
          onPress={onContinue}
          loading={loading}
          textStyle={textStyle}
        />
      </ViewWithHeaderAndButton>
    )
  }
}
