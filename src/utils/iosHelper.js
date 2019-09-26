import { Dimensions, Platform } from 'react-native'

export const isIphoneX = () => {
  const d = Dimensions.get('window')
  return !!(Platform.OS === 'ios' && (d.height > 800 || d.width > 800))
}
