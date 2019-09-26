import { SwipeRow } from 'react-native-swipe-list-view'
import { ReactElement } from 'react'

declare module 'react-native-swipe-list-view' {
  
  interface IUseSectionListProps<T> {
    renderItem: (rowData: T, rowMap: RowMap<T>) => ReactElement
  }

}