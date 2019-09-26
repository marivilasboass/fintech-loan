import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { View, BaseHeader, HeaderButton, Colors, Typography, Spacing, Button, ProfileFingerprintIcon } from '~/newUI'
import FullScreenModalCloseIcon from '~/newUI/Modal/components/FullScreenModalCloseIcon'
import ExitModal from './components/ExitModal'
import { api } from '~/services/api'
import * as R from 'ramda'
import { formatDate } from '~/utils/dateTimeHelpers'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white
  },
  title: {
    textAlign: 'center',
    marginBottom: 10
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Spacing.s6
  },
  button: {
    margin: Spacing.s6
  },
  text: {
    textAlign: 'center'
  },
  updateDate: {
    marginTop: Spacing.s6
  }
})

export default class LoanQuestionnaireIntro extends React.PureComponent {
  state = {
    showExitModal: false,
    loading: false
  }

  navigateToSuitability = async () => {
    try {
      const { navigation } = this.props
      this.setState({ loading: true })
      const { data: result } = await api.post('account/user/getQuestions')
      const { data: questions } = result
      const parsedQuestions = R.map((question) => ({ ...question, answer: question.defaultAnswer }), questions)
      this.setState({ loading: false })
      navigation.navigate('Suitability', { questions: parsedQuestions })
    } catch (err) {
      Alert.alert('Ops!', 'Não foi possível finalizar o investimento, entre em contato com nossa central de atendimento.')
      this.setState({ loading: false })
    }
  }

  onExit = () => {
    this.setState({ showExitModal: false })
    this.props.screenProps.navigation.goBack(null)
  }

  render () {
    const { lastAnsweredSuitabilityAt } = this.props
    const { showExitModal, loading } = this.state
    const formattedDate = formatDate(lastAnsweredSuitabilityAt)
    return (
      <React.Fragment>
        {showExitModal && (
          <ExitModal
            isVisible={showExitModal}
            onExit={this.onExit}
            onUpdate={() => this.setState({ showExitModal: false })}
          />
        )}
        <View style={styles.wrapper}>
          <BaseHeader
            style={{ backgroundColor: Colors.white }}
            leftComponent={(
              <HeaderButton onPress={() => this.setState({ showExitModal: true })}>
                <FullScreenModalCloseIcon />
              </HeaderButton>
            )}
          />
          <View paddedHorizontally style={styles.info}>
            <ProfileFingerprintIcon />
            <View>
              <Typography.H3 adaptSize style={styles.title}>Perfil de investidor</Typography.H3>
              <Typography.T2 adaptSize style={styles.text}>Antes de continuar com o investimento, é importante atualizar o seu perfil de investidor no aplicativo.</Typography.T2>
            </View>
          </View>
          { lastAnsweredSuitabilityAt
            ? <Typography.T2 style={styles.updateDate} align={'center'} color={Colors.warmGray}>Última atualização em {formattedDate}</Typography.T2>
            : null}
          <View style={styles.button}>
            <Button
              loading={loading}
              onPress={() => this.navigateToSuitability()}
              title={'Vamos iniciar!'}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }
}
