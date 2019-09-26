import React from 'react'

import { Alert } from 'react-native'
import RefreshAlert from './RefreshAlert'

const refreshTime = 30

export default class TimerManager extends React.PureComponent {
  state = {
    refreshLoading: false,
    needRefresh: false
  }

  componentDidMount () {
    this.setTimer()
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  setTimer = () => {
    this.interval = setInterval(() => {
      this.props.updateTimer()
      if (this.props.countdown === 0) {
        this.clearTimer()
      }
    }, 1000)
  }

  clearTimer = () => this.interval && clearInterval(this.interval)

  toggleNeedRefresh = (needRefresh) => this.setState({ needRefresh })

  refreshTimer = async () => {
    try {
      this.setState({ refreshLoading: true })
      await this.props.onRefresh()
      this.props.updateTimer(true)
      this.clearTimer()
      this.setState({
        refreshLoading: false,
        needRefresh: false
      })
      this.setTimer()
    } catch (err) {
      alert(err)
      this.setState({
        refreshLoading: false,
        needRefresh: false
      })
      Alert.alert(
        'Ops!',
        'Não foi possível reniciar o tempo da sua reserva, por favor tente novamente mais tarde.'
      )
    }
  }

  render () {
    const { children, countdown } = this.props
    const { refreshLoading, needRefresh } = this.state

    if (countdown === 0) {
      this.clearTimer()
    }

    return (
      <React.Fragment>
        {children({
          toggleNeedRefresh: this.toggleNeedRefresh,
          refreshTime,
          timer: 300
        })}
        <RefreshAlert
          loading={refreshLoading}
          onConfirm={this.refreshTimer}
          isVisible={needRefresh}
          onCloseModal={() => this.toggleNeedRefresh(false)}
        />
      </React.Fragment>
    )
  }
}
