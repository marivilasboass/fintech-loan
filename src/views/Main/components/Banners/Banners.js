import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Typography, Spacing, Card, Colors } from '~/newUI'
import BannersFactory from './BannersFactory'
import { ChevronRight } from '~/newUI/Icons'
import resolveLink from '~/services/resolveLink'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s6,
    paddingTop: Spacing.s5,
    paddingBottom: Spacing.s5 + 2
  },
  title: {
    marginBottom: Spacing.s1
  },
  description: {
    opacity: 0.8
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: Spacing.s2,
    flexDirection: 'row'
  },
  buttonText: {
    lineHeight: 14
  },
  buttonIcon: {
    alignSelf: 'center',
    marginLeft: 6
  }
})

export default class Banners extends React.PureComponent {
  handleOnBannerPress = () => {
    const { navigation, link, _id, onBannerPress } = this.props
    onBannerPress(_id)
    resolveLink(navigation, link)
  }

  render () {
    const { bannerType, title, description, btnText } = this.props

    if (bannerType && BannersFactory[bannerType]) {
      const { container, text } = BannersFactory[bannerType]
      return (
        <Card innerStyle={{ overflow: 'hidden' }} onPress={this.handleOnBannerPress}>
          <View style={[styles.container].concat(container)}>
            <View style={styles.textContainer}>
              <Typography.H5 style={[text].concat(styles.title)}>{title}</Typography.H5>
              <Typography.T4 style={[text].concat(styles.description)}>{description}</Typography.T4>
              <View style={[{ marginLeft: text.marginLeft }].concat(styles.button)}>
                <Typography.T4 color={text.color} style={styles.buttonText} variant='bold'>{btnText}</Typography.T4>
                <ChevronRight style={styles.buttonIcon} color={Colors.white} width={7} height={10} />
              </View>
            </View>
          </View>
        </Card>
      )
    }
    return null
  }
}
