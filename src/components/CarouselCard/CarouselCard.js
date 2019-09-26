import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { View, Card } from '~/newUI'

const Screen = Dimensions.get('window')
const sliderWidth = Screen.height
const shadowHeight = 1
const cardMarginRight = 20

const styles = StyleSheet.create({
  slider: {
    overflow: 'visible'
  }
})

export default class CarouselCard extends React.PureComponent {
  static defaultProps = {
    itemWidth: 225,
    itemHeight: 90
  }

  renderItem = ({ item, index }) => {
    const { showContent, itemHeight, itemWidth, onPress } = this.props
    return (
      <Card
        outerStyle={{ marginLeft: 20 }}
        style={{ height: itemHeight, width: itemWidth }}
        layout={'fixed'}
        width={itemWidth}
        height={itemHeight}
        onPress={() => onPress(item)}
      >
        {showContent(item, index)}
      </Card>
    )
  }

  render () {
    const { style, data, navigation, itemHeight, itemWidth } = this.props
    const sliderHeight = itemHeight + shadowHeight
    const itemWidthWithMargin = itemWidth + cardMarginRight
    return (
      <View style={style}>
        <ScrollView
          scrollEventThrottle={200}
          directionalLockEnabled
        >
          <Carousel
            data={data}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidthWithMargin}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
            containerCustomStyle={[styles.slider].concat({ height: sliderHeight })}
            removeClippedSubviews
            extraData={navigation}
          />
        </ScrollView>
      </View>
    )
  }
}
