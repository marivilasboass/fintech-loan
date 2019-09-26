import { Share } from 'react-native'

export default function share (title, message) {
  const content = { title, message }
  return Share.share(content)
}
