import * as R from 'ramda'
import { Amplitude, Segment, Constants, DangerZone } from 'expo'
import Sentry from 'sentry-expo'
import config from '~/../config'

const { Branch } = DangerZone

const isStandalone = Constants.appOwnership === 'standalone'
const isBranchDisabled = `${R.path(['android', 'versionCode'], Constants)}` === '3004005'

export const initialize = () => {
  if (!isStandalone) {
    return
  }

  if (config.segmentAndroidWriteKey && config.segmentIOSWriteKey) {
    Segment.initialize({
      androidWriteKey: config.segmentAndroidWriteKey,
      iosWriteKey: config.segmentIOSWriteKey
    })
  }

  if (config.amplitudeApiKey) {
    Amplitude.initialize(config.amplitudeApiKey)
  }
}

export const identify = (userId, properties) => {
  if (!isStandalone) {
    return
  }

  Segment.identifyWithTraits(userId, properties)

  if (!isBranchDisabled) {
    Branch.setIdentity(userId)
  }

  const { email, username, ...otherProperties } = properties
  Sentry.setUserContext({
    id: userId,
    email,
    username,
    extra: otherProperties
  })

  Amplitude.setUserId(userId)
  Amplitude.setUserProperties(properties)
}

export const track = (eventName, properties) => {
  if (!isStandalone) {
    return
  }

  trackSegmentEvent(eventName, properties)
  trackAmplitudeEvent(eventName, properties)
  trackBranchEvent(eventName, properties)
}

const trackSegmentEvent = (eventName, properties) => {
  if (properties === undefined) {
    Segment.track(eventName)
    return
  }

  Segment.trackWithProperties(eventName, properties)
}

const trackAmplitudeEvent = (eventName, properties) => {
  if (properties === undefined) {
    Amplitude.logEvent(eventName)
    return
  }

  Amplitude.logEventWithProperties(eventName, properties)
}

export const trackScreen = (screenName, properties) => {
  if (!isStandalone) {
    return
  }

  if (properties === undefined) {
    Segment.screen(screenName)
    Amplitude.logEvent(`Screen${screenName}`)
    return
  }

  Segment.screenWithProperties(screenName, properties)
  Amplitude.logEventWithProperties(`Screen${screenName}`, properties)
}

const trackBranchEvent = (eventName, properties) => {
  if (isBranchDisabled) {
    return
  }

  const { BranchEvent } = require('react-native-branch')
  if (properties === undefined) {
    const branchEvent = new BranchEvent(eventName)
    branchEvent.logEvent()
  }

  const branchEvent = new BranchEvent(eventName, null, properties)
  branchEvent.logEvent()
  if (eventName === 'RequestLoan') {
    const branchEvent = new BranchEvent(BranchEvent.AddToWishlist, null, properties)
    branchEvent.logEvent()
  }

  if (eventName === 'MakeInvestment') {
    const branchEvent = new BranchEvent(BranchEvent.Purchase, null, properties)
    branchEvent.logEvent()
  }
}
