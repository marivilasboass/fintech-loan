import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Colors, Typography, Spacing } from '~/newUI'
import SubtitleLabel from '../SubtitleLabel'

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.s1,
    marginBottom: Spacing.s2,
    borderRadius: 10,
    backgroundColor: Colors.mercury,
    flexDirection: 'row'
  },
  progress: {
    borderRadius: 10,
    borderWidth: 0
  },
  tooltipIndicatorTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: Spacing.s2,
    borderRightWidth: Spacing.s2,
    borderBottomWidth: Spacing.s2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.mercury
  },
  tooltipIndicatorBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: Spacing.s2,
    borderRightWidth: Spacing.s2,
    borderTopWidth: Spacing.s2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.mercury
  },
  tooltipBase: {
    width: 80,
    height: 36,
    backgroundColor: Colors.mercury,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailValueLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default class ProgressBar extends React.PureComponent {
  state = {
    progressBars: []
  }

  componentDidMount = () => {
    this.setProgressBars()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.primaryProgress !== this.props.primaryProgress || prevProps.secondariesProgress !== this.props.secondariesProgress) {
      this.setProgressBars()
    }
  }

  setProgressBars = () => {
    const { primaryProgress, secondariesProgress } = this.props
    if (secondariesProgress) {
      const progressBars = secondariesProgress.concat(primaryProgress)
      progressBars.sort((a, b) => (a.progress > b.progress) ? 1 : ((b.progress > a.progress) ? -1 : 0))
      this.setState({ progressBars })
    } else {
      this.setState({ progressBars: [primaryProgress] })
    }
  }

  getWidthByProgress = (progress) => {
    const { width } = this.props
    return width * progress / 100
  }

  showProgressBars = () => {
    const { height, width, hideLabels } = this.props
    const { progressBars } = this.state
    if (progressBars && progressBars.length === 0) {
      return
    }
    return (
      <View>
        {!hideLabels && this.setTooltip('top', progressBars[0])}
        <View style={[styles.container].concat({ height, width })}>
          {this.showBars()}
        </View>
        {!hideLabels && this.setTooltip('bottom', progressBars[1])}
      </View>
    )
  }

  showBars = () => {
    const { height, width } = this.props
    const { progressBars } = this.state
    return progressBars.map((progressBar, index) => {
      const { progress, color } = progressBar
      const marginLeft = index > 0 && progress > 0 ? -5 : 0
      const barWidth = index > 0
        ? (width * progress / 100) - this.getWidthByProgress(progressBars[index - 1].progress) - marginLeft
        : (width * progress / 100)
      return (
        <View
          key={index}
          style={[styles.progress].concat({
            marginLeft,
            width: barWidth,
            height,
            zIndex: 100 - index,
            backgroundColor: color
          })}
        />
      )
    })
  }

  getTooltipInfo = (positionBasedOnProgress, tooltipIndicatorMargin) => {
    const { width, primaryProgress } = this.props
    const { progress } = primaryProgress
    const minimumPosition = 0
    const maximumPosition = width - 32
    if (progress < 5) {
      return { progressLabelMargin: minimumPosition, tooltipMargin: -tooltipIndicatorMargin }
    } else if (progress > 95) {
      return { progressLabelMargin: maximumPosition, tooltipMargin: positionBasedOnProgress - tooltipIndicatorMargin - 12 }
    }
    return { progressLabelMargin: positionBasedOnProgress, tooltipMargin: positionBasedOnProgress - tooltipIndicatorMargin }
  }

  setTooltip = (position, progressBar) => {
    const { progress, progressValue } = progressBar
    const { width } = this.props
    const progressLabelSize = 12
    const tooltipIndicatorLeftMargin = 10
    const tooltipIndicatorRightMargin = 54
    const tooltipIndicatorMargin = progress < 50 ? tooltipIndicatorLeftMargin : tooltipIndicatorRightMargin
    const positionBasedOnProgress = (width * progress / 100) - progressLabelSize
    const {
      progressLabelMargin,
      tooltipMargin
    } = this.getTooltipInfo(positionBasedOnProgress, tooltipIndicatorMargin)
    if (position === 'top') {
      return (
        <View>
          <View style={{ marginLeft: tooltipMargin }}>
            <View style={styles.tooltipBase}>
              <Typography.T6 color={Colors.mutualBlue} variant={'semibold'}>R$ {progressValue}</Typography.T6>
            </View>
            <View style={[styles.tooltipIndicatorBottom, { marginLeft: tooltipIndicatorMargin }]} />
          </View>

          <Typography.T6 style={{ marginLeft: progressLabelMargin }}>{progress}%</Typography.T6>
        </View>
      )
    }
    return (
      <View>
        <Typography.T6 style={{ marginLeft: progressLabelMargin }}>{progress}%</Typography.T6>
        <View style={{ marginLeft: tooltipMargin }}>
          <View style={[styles.tooltipIndicatorTop, { marginLeft: tooltipIndicatorMargin }]} />
          <View style={styles.tooltipBase}>
            <Typography.T6 color={Colors.mutualBlue} variant={'semibold'}>R$ {progressValue}</Typography.T6>
          </View>
        </View>
      </View>
    )
  }

  showDetailLabels = () => {
    const { initValue, finalValue } = this.props
    const { progressBars } = this.state
    return (
      <View>
        <View style={styles.detailValueLabel}>
          <Typography.T6 variant={'light'}>R$ {initValue}</Typography.T6>
          <Typography.T6 variant={'light'}>R$ {finalValue}</Typography.T6>
        </View>
        <SubtitleLabel labels={progressBars} style={{ marginTop: Spacing.s3 }} />
      </View>
    )
  }

  render () {
    const { style, hideLabels } = this.props
    return (
      <View style={style}>
        {this.showProgressBars()}
        { !hideLabels && this.showDetailLabels()}
      </View>
    )
  }
}
