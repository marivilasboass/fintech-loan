import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from '~/UI'
import { Colors, Typography, View, Spacing, AvatarProgress } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90
  },
  textContainer: {
    paddingLeft: Spacing.s4,
    justifyContent: 'center'
  },
  avatar: {
    paddingLeft: Spacing.s6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarOverlay: {
    borderColor: 'transparent'
  },
  tag: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 18,
    borderTopWidth: 18,
    borderRightColor: 'transparent',
    borderRadius: 5
  },
  tagContainer: {
    position: 'absolute',
    top: 3,
    left: 3,
    zIndex: 99
  },
  score: {
    position: 'absolute',
    top: 11,
    right: 11,
    width: 30,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  }
})

export default class LoanCardHeader extends React.PureComponent {
  static defaultProps = {
    onPress: () => { alert(`You've clicked`) },
    score: 'A',
    titleColor: Colors.mutualBlue
  }

  renderAvatar = () => {
    const { total, value, error, borrower, profilePicture } = this.props
    const picture = (borrower && borrower.smallProfilePicture) || profilePicture
    if (total) {
      return <AvatarProgress total={total} value={value} error={error} picture={picture} />
    }
    return <Avatar picture={picture} style={styles.avatarOverlay} />
  }

  render () {
    const {
      title,
      titleColor,
      subtitle,
      description,
      score,
      scoreFull,
      showTag
    } = this.props
    const scoreColor = Colors[`score${score}`]
    return (
      <View style={styles.container}>
        { showTag && (
          <View style={styles.tagContainer}>
            <View style={[styles.tag].concat({ borderTopColor: Colors.mutualPink })} />
          </View>
        )}
        <View style={styles.avatar}>
          {this.renderAvatar()}
        </View>
        <View style={styles.textContainer}>
          <Typography.H5 adaptSize color={titleColor}>{title}</Typography.H5>
          { subtitle && (
            <Typography.T4 adaptSize numberOfLines={1}>{subtitle}</Typography.T4>
          )}
          <Typography.T4 adaptSize color={Colors.warmGray}>{description}</Typography.T4>
        </View>
        { scoreFull && (
          <View style={[styles.score].concat({ backgroundColor: scoreColor })}>
            <Typography.T4 color={Colors.white}>{scoreFull}</Typography.T4>
          </View>
        )}
      </View>
    )
  }
}
