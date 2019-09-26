import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { withKnobs } from '@storybook/addon-knobs'
import { View, Colors } from '~/newUI'

import LineChart from './LineChart'

const lines = [
  {
    color: Colors.mutualPink,
    data: [
      { x: new Date('2018-01-02'), y: 20 },
      { x: new Date('2018-02-02'), y: 60 },
      { x: new Date('2018-03-02'), y: 40 },
      { x: new Date('2018-04-02'), y: 80 },
      { x: new Date('2018-05-02'), y: 50 },
      { x: new Date('2018-06-02'), y: 30 },
      { x: new Date('2018-07-02'), y: 90 },
      { x: new Date('2018-08-02'), y: 100 }
    ]
  },
  {
    color: Colors.mutualBlue,
    data: [
      { x: new Date('2018-01-02'), y: 13 },
      { x: new Date('2018-02-02'), y: 21 },
      { x: new Date('2018-03-02'), y: 63 },
      { x: new Date('2018-04-02'), y: 5 },
      { x: new Date('2018-05-02'), y: 87 },
      { x: new Date('2018-06-02'), y: 52 },
      { x: new Date('2018-07-02'), y: 76 },
      { x: new Date('2018-08-02'), y: 95 }
    ]
  }
]

class LineChartComponent extends React.Component {
  state = {
    width: 0
  }
  render () {
    return (
      <View onLayout={({ nativeEvent }) => this.setState({ width: nativeEvent.layout.width })} style={{ backgroundColor: '#fff', paddingTop: 30 }}>
        <LineChart lines={lines} height={180} width={this.state.width} />
      </View>
    )
  }
}

storiesOf('LineChart', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <LineChartComponent />
  ))
