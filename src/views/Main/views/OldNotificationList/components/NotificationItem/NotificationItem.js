import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Colors, Touch, Icon, Avatar } from '~/UI'
import formatShortDate from '~/utils/formatShortDate'

const spacing = 15
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.azureishWhite
  },
  viewedContainer: {
    backgroundColor: Colors.backgroundDark
  },
  iconContainer: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginVertical: spacing,
    marginHorizontal: spacing,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.bluishWhite
  },
  icon: {
    fontSize: 20,
    color: Colors.dark
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing,
    paddingVertical: spacing
  },
  topContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter
  },
  title: {
    flex: 1,
    flexWrap: 'wrap'
  },
  date: {
    marginTop: 3,
    color: Colors.gray
  },
  bottomStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  avatar: {
    marginVertical: spacing / 2,
    marginRight: spacing / 2
  },
  description: {
    marginTop: spacing / 2,
    flex: 1
  },
  hidden: {
    opacity: 0,
    height: 0
  }
})

const categoryAssets = {
  transaction: 'cash',
  loan: 'cash',
  collection: 'cash',
  account: 'account'
}

export default class NotificationItem extends React.PureComponent {
  render () {
    const { title, description, highlightColor, category, sameAsPrevious, sameAsNext, createdAt, onPress, viewedAt } = this.props
    const icon = categoryAssets[category] || 'star'
    const color = Colors[highlightColor] || Colors.dark

    const picture = null // variables && variables.subjectAvatarUrl

    const containerStyle = [
      styles.container,
      viewedAt && styles.viewedContainer,
      !sameAsNext && styles.borderBottom
    ]

    const iconContainer = [
      styles.iconContainer,
      sameAsPrevious && styles.hidden
    ]

    const textContainer = [
      styles.textContainer,
      sameAsNext && styles.borderBottom
    ]

    return (
      <Touch onPress={onPress}>
        <View style={containerStyle}>
          <View style={iconContainer}>
            <Icon type={icon} style={[styles.icon, { color }]} />
          </View>

          <View style={textContainer}>
            <View style={styles.topContainer}>
              <Text size='xsmall' style={styles.date}>
                {formatShortDate(createdAt)}
              </Text>
              <Text bold style={[styles.title, { color }]}>
                {title}
              </Text>
            </View>
            <View style={styles.bottomStyle}>
              { picture &&
                <Avatar containerStyle={styles.avatar} size='small' picture={picture} />
              }
              <View style={styles.description}>
                <Text markdown size='small'>
                  {description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Touch>
    )
  }
}
