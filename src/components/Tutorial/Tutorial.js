import React from 'react'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { Colors, View, Button, Typography, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    flex: 1
  },
  slideHeader: {
    marginTop: Spacing.s6,
    alignItems: 'center'
  },
  titleHeader: {
    marginTop: 40,
    marginHorizontal: Spacing.s6,
    alignItems: 'center'
  },
  slide: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: Spacing.s6
  },
  swiper: {
    flex: 1
  },
  text: {
    textAlign: 'center'
  },
  instructionTitle: {
    textAlign: 'center',
    marginBottom: 5
  },
  button: {
    margin: 10
  },
  spacing: {
    minHeight: 40
  }
})

export default class Tutorial extends React.PureComponent {
  state = {
    lastSlide: false
  }

  render () {
    const { title, subtitle, pages, buttonText, onPressButton, loading, ...otherProps } = this.props
    const { lastSlide } = this.state

    const slides = pages.map((p, i) => {
      const { instructionTitle, description, image } = p

      return (
        <View style={styles.slide} key={i}>
          {image}
          <View style={styles.slideHeader}>
            <Typography.H5 adaptSize style={styles.instructionTitle}>{instructionTitle}</Typography.H5>
            <Typography.T2 adaptSize style={styles.text}>{description}</Typography.T2>
          </View>
          <View style={styles.spacing} />
        </View>
      )
    })

    return (
      <View style={styles.wrapper} {...otherProps}>
        <View style={title && styles.titleHeader}>
          <Typography.H3 adaptSize style={[styles.text, { marginBottom: 5 }]}>{title}</Typography.H3>
          <Typography.T4 adaptSize style={[styles.text, { marginBottom: Spacing.s6 }]}>{subtitle}</Typography.T4>
        </View>

        <Swiper
          containerStyle={styles.swiper}
          activeDotColor={Colors.primary}
          onIndexChanged={swipperIndex => this.setState({ lastSlide: swipperIndex + 1 === pages.length })}
          loop={false}
          paginationStyle={{ position: 'absolute', bottom: 5 }}
        >
          {slides}
        </Swiper>
        <Button
          onPress={onPressButton}
          style={[styles.button, !lastSlide && { opacity: 0 }]}
          rightIcon={{ name: 'arrow-forward' }}
          title={buttonText}
          loading={loading}
        />
      </View>
    )
  }
}
