/// <reference types='react' />
/// <reference types='react-native' />

declare module 'react-native-modal-selector' {
  import * as React from 'react'
  import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

  export interface SelectableItem {
    label?: string,
    key?: string,
    component?: React.Component
  }

  type SelectorProps<T extends SelectableItem> = {
    overlayStyle: ViewStyle | ImageStyle
    data: T[]
    cancelText: string
    cancelStyle: ViewStyle | ImageStyle
    cancelTextStyle: TextStyle
    optionTextStyle: TextStyle
    optionStyle: ViewStyle | ImageStyle
    keyExtractor: (item: T) => any
    backdropPressToClose: boolean
    onChange: (item: T) => any
    animationType: 'none' | 'slide' | 'fade'
  }

  export default class Selector<T extends SelectableItem> extends React.Component<SelectorProps<T>>{}
}