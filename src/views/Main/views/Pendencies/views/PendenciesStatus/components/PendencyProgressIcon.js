import React from 'react'
import { CircularProgress } from 'react-native-circular-progress'
import { Svg } from 'expo'

import { View, Text } from '~/newUI'
import Colors from '~/newUI/Colors'
import { resolvedStatuses } from '~/services/pendencyStatus'

export default function PendencyProgressIcon ({ status, progress }) {
  if (status === 'rejected') {
    return (
      <CircularProgress
        rotation={0}
        size={34}
        fill={100}
        width={2}
        tintColor={Colors.red}
        style={{ alignSelf: 'center' }} >
        {fill => (
          <Text fontSize={20} variant='heavy' color={Colors.red}>!</Text>
        )}
      </CircularProgress>
    )
  }

  if (resolvedStatuses.includes(status)) {
    return (
      <View style={{ width: 34, height: 34, borderWidth: 2, borderRadius: 17, borderColor: Colors.secondary, paddingLeft: 2 }}>
        <Svg style={{ alignSelf: 'center' }} width='34' height='34'>
          <Svg.Path d='M13.5736443,22.8500004 C13.2628107,22.8500004 12.9525842,22.7296994 12.7152094,22.4884804 L7,16.680717 L8.71686978,14.9354267 L13.5736443,19.8708534 L23.2871933,10 L25.0040631,11.7452903 L14.4320792,22.4884804 C14.1947043,22.7296994 13.8844778,22.8500004 13.5736443,22.8500004 Z' fill={Colors.secondary} fillRule='nonzero' />
        </Svg>
      </View>
    )
  }

  return (
    <CircularProgress
      rotation={0}
      size={34}
      fill={progress}
      width={2}
      tintColor={Colors.secondary}
      backgroundColor={Colors.solitude}
      style={{ alignSelf: 'center' }} >
      {fill => (
        <Text fontSize={12} color={progress > 0 ? Colors.secondary : Colors.warmGray}>{fill}%</Text>
      )}
    </CircularProgress>
  )
}
