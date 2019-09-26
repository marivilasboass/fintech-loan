import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from '~/UI'
import { Typography, Colors, Spacing, Touch } from '~/newUI'
import formatShortDate from '~/utils/formatShortDate'
import { NotificationItemProps } from '../../types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: Spacing.s6,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginVertical: Spacing.s5,
    marginRight: Spacing.s5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  icon: {
    fontSize: 20
  },
  textContainer: {
    flex: 1,
    paddingVertical: Spacing.s5
  },
  topContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dashed
  },
  title: {
    flex: 1,
    flexWrap: 'wrap'
  },
  date: {
    marginTop: 3,
    marginRight: 4
  },
  bottomStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  description: {
    marginTop: Spacing.s5 / 2,
    flex: 1
  },
  hidden: {
    opacity: 0,
    height: 0
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notReadIndicator: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: Colors.lightPink,
    marginTop: 3
  }
})

const categoryAssets = {
  transaction: 'cash',
  loan: 'cash',
  collection: 'cash',
  account: 'account'
}

export default class NotificationItem extends React.PureComponent<NotificationItemProps> {
  render () {
    const { title, description, highlightColor, category, sameAsPrevious, createdAt, onPress, viewedAt, allNoticesRead } = this.props
    const icon = categoryAssets[category] || 'star'
    const color = Colors[highlightColor] || Colors.darkBlue

    const containerStyle = [
      styles.container,
      styles.borderBottom
    ]

    const iconContainer = [
      styles.iconContainer,
      sameAsPrevious && styles.hidden
    ]

    const textContainer = [
      styles.textContainer
    ]

    return (
      <Touch onPress={onPress}>
        <View style={{backgroundColor: !viewedAt && !allNoticesRead ? Colors.whiteGray : Colors.white}}>
          <View style={containerStyle}>
            <View style={iconContainer}>
              <Icon type={icon} style={[styles.icon, { color }]} />
            </View>

            <View style={textContainer}>
              <View style={styles.topContainer}>
                <View style={styles.dateContainer}>
                  <Typography.T4 color={Colors.warmGray} style={styles.date}>
                    {formatShortDate(createdAt)}
                  </Typography.T4>
                  { !viewedAt && !allNoticesRead && <View style={styles.notReadIndicator} />}
                </View>
                <Typography.T1 style={[styles.title, { color }]}>
                  {title}
                </Typography.T1>
              </View>
              <View style={styles.bottomStyle}>
                <View style={styles.description}>
                  <Typography.Markdown style={{ fontSize: 14 }}>
                    {description}
                  </Typography.Markdown>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Touch>
    )
  }
}
