import React from 'react'
import { Icon as RNEIcon } from 'react-native-elements'
import UIIcon from '~/UI/Icon'

import * as SvgIcons from './Icons'

const normalizedSvgIcons = {}

Object.keys(SvgIcons).forEach(key => {
  normalizedSvgIcons[key.toLowerCase()] = SvgIcons[key]
})

export default class Icon extends React.PureComponent {
  render () {
    if (this.props.type === 'mutual') {
      const { style, name, type, color, size, ...props } = this.props
      const passedStyle = [
        color && { color },
        size && { fontSize: size }
      ].concat(style)
      return <UIIcon {...props} name={null} type={name} style={passedStyle} />
    }
    if (this.props.type === 'svg') {
      const { name, ...props } = this.props

      if (!normalizedSvgIcons[name.toLowerCase()]) {
        throw new Error(`Icon ${name} not found.`)
      }

      const SvgIcon = normalizedSvgIcons[name.toLowerCase()]

      return <SvgIcon {...props} />
    }

    return <RNEIcon containerStyle={this.props.style} {...this.props} />
  }
}
