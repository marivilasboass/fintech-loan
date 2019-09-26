import React from 'react'
import { Card } from '~/newUI'
import InfoCardLine from './InfoCardLine'

export default class InfoCard extends React.PureComponent {
  render () {
    const { lines, style } = this.props
    return (
      <Card outerStyle={style}>
        {lines.map((line, index) => (
          <InfoCardLine key={index} line={line} hideSeparator={index === 0} />
        ))}
      </Card>
    )
  }
}
