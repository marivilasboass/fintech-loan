import React from 'react'
import { StyleSheet } from 'react-native'
import Suitability from '../../../AcceptLoan/views/Suitability'
import { Terms, CountdownButton, BaseHeader, HeaderButton, Colors, View, Spacing } from '~/newUI'
import { BackArrow } from '~/newUI/Icons'
import TimerManager from '../../components/TimerManager'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  button: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.s6
  }
})

export default class InvestorTerms extends React.Component {
  state = {
    term: 'first',
    loading: false,
    disabled: true,
    confirmed: false
  }

  updateTimer = (reset) => {
    if (reset) {
      this.props.resetTimer()
    }
    const { countdown } = this.props
    this.props.update({
      countdown: countdown - 1
    })
  }

  onAdvance = () => {
    const { term } = this.state
    if (term === 'first') {
      this.setState({
        term: 'second',
        confirmed: false,
        disabled: true
      })
      return
    }
    if (term === 'second') {
      this.setState({
        term: 'suitability',
        confirmed: false,
        disabled: true
      })
      return
    }
    this.props.onAdvance()
  }

  onAcceptAll = () => {
    this.setState({ disabled: false, confirmed: true })
    this.props.onAdvance()
  }

  render () {
    const { onBack, countdown, countdownDisabled } = this.props
    const { term, loading, disabled, confirmed } = this.state

    if (loading) {
      return <View />
    }

    return (
      <TimerManager countdown={this.props.countdown} updateTimer={this.updateTimer} onRefresh={this.props.refreshLoansReserved}>
        {({ timer, refreshTime, toggleNeedRefresh }) => (
          <React.Fragment>
            <BaseHeader
              style={{ backgroundColor: Colors.white }}
              statusBarProps={{ barStyle: 'dark-content', backgroundColor: Colors.white }}
              leftComponent={(
                <HeaderButton onPress={onBack}>
                  <BackArrow />
                </HeaderButton>
              )}
            />
            <View style={styles.container} paddedHorizontally>
              {(term === 'first') && (
                <Terms
                  uri='http://mutual.club/Mutual.Termos.e.condicoes.Investidores.html'
                  confirmText='Eu concordo com os Termos e Condições de Uso para Investidores'
                  confirmed={confirmed}
                  onConfirmChanged={() => this.setState({ confirmed: !confirmed, disabled: !disabled })}
                />
              )}
              {(term === 'second') && (
                <Terms
                  confirmText='Eu concordo com a Procuração para Representação Junto A Instituição Financeira.'
                  uri='http://mutual.club/procuracao.investidor.html'
                  confirmed={confirmed}
                  onConfirmChanged={() => this.setState({ confirmed: !confirmed, disabled: !disabled })}
                />
              )}
              {(term === 'suitability') && (
                <Suitability onAdvance={this.onAcceptAll} disabled={confirmed} />
              )}
            </View>
            <View style={styles.button} paddedHorizontally>
              <CountdownButton
                timer={timer}
                countdown={countdown}
                refreshTime={refreshTime}
                title='Continuar'
                disabled={disabled || countdownDisabled}
                onPress={this.onAdvance}
                onRefreshNeeded={() => toggleNeedRefresh(true)}
              />
            </View>
          </React.Fragment>
        )}
      </TimerManager>
    )
  }
}
