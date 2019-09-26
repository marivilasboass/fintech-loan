import React from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Coins extends React.PureComponent {
  static defaultProps = {
    color: Colors.lightPink
  }

  render () {
    const { color } = this.props

    return (
      <Svg xmlns='http://www.w3.org/2000/svg' width='85' height='101'>
        <Svg.G fill={color}>
          <Svg.Path d='M62.422 23.035c-.797-.709-1.24-1.595-1.24-2.57a.605.605 0 0 0-.62-.62.605.605 0 0 0-.62.62c0 1.33.62 2.57 1.683 3.545.885.797 2.036 1.24 3.276 1.329v2.48c0 .355.266.62.62.62s.62-.265.62-.62v-2.48c1.24-.089 2.39-.62 3.276-1.33 1.062-.974 1.682-2.214 1.682-3.543 0-1.33-.62-2.57-1.682-3.544-.886-.797-2.037-1.24-3.276-1.329V8.328c.885.089 1.77.443 2.479 1.063.797.709 1.24 1.595 1.24 2.57 0 .354.265.62.62.62.353 0 .619-.266.619-.62 0-1.33-.62-2.57-1.682-3.544-.886-.798-2.037-1.24-3.276-1.33V4.519a.605.605 0 0 0-.62-.62.605.605 0 0 0-.62.62V7c-1.24.089-2.39.62-3.276 1.33-1.063.974-1.682 2.214-1.682 3.543 0 1.329.62 2.57 1.682 3.544.885.797 2.036 1.24 3.276 1.329v7.353a4.448 4.448 0 0 1-2.48-1.063zm6.198-5.05c.797.709 1.24 1.595 1.24 2.57 0 .974-.443 1.86-1.24 2.569a4.2 4.2 0 0 1-2.48 1.063V17.01c.975 0 1.86.354 2.48.974zm-6.198-3.544c-.797-.709-1.24-1.595-1.24-2.57 0-.974.443-1.86 1.24-2.568A4.2 4.2 0 0 1 64.9 8.239v7.177c-.885 0-1.77-.355-2.48-.975z' />
          <Svg.Path d='M84.734 93.912V32.515v-.089c-.088-2.215-2.921-4.075-7.791-5.315 2.745-2.836 4.427-6.645 4.427-10.898 0-8.682-7.084-15.77-15.76-15.77-8.678 0-15.761 7.088-15.761 15.77 0 4.253 1.682 8.062 4.427 10.898-4.87 1.24-7.703 3.1-7.792 5.315v61.398c0 4.34 9.828 6.733 19.125 6.733s19.125-2.303 19.125-6.645zm-1.328-40.754v1.506c-11.333 4.784-24.349 4.784-35.682 0v-8.948c5.667 2.303 11.776 3.544 17.885 3.544 6.11 0 12.13-1.152 17.886-3.544v7.442h-.089zm-17.885 6.379c6.11 0 12.13-1.152 17.885-3.544v8.948c-11.333 4.784-24.349 4.784-35.682 0v-8.948c5.667 2.392 11.776 3.544 17.797 3.544zM47.724 73.8v-7.442c5.667 2.303 11.776 3.544 17.885 3.544 6.11 0 12.13-1.152 17.886-3.544v8.948c-11.334 4.784-24.35 4.784-35.683 0v-1.506h-.088zm35.682-31.009v1.506c-11.333 4.784-24.349 4.784-35.682 0v-9.214c3.01 2.747 10.625 4.164 17.885 4.164 7.26 0 14.875-1.417 17.886-4.164v7.708h-.089zM47.724 76.725c5.667 2.303 11.776 3.543 17.885 3.543 6.11 0 12.13-1.151 17.886-3.543v8.948c-11.334 4.784-24.35 4.784-35.683 0v-8.948h-.088zM65.521 1.772c7.969 0 14.432 6.467 14.432 14.441 0 7.974-6.463 14.441-14.432 14.441s-14.432-6.467-14.432-14.44c0-7.975 6.463-14.442 14.432-14.442zM55.339 28.174a15.394 15.394 0 0 0 10.182 3.81c3.896 0 7.437-1.418 10.27-3.81 4.605 1.063 7.615 2.746 7.615 4.34 0 2.57-7.349 5.405-17.885 5.405-10.537 0-17.886-2.835-17.886-5.404.089-1.595 3.01-3.278 7.704-4.341zM65.52 99.317c-10.537 0-17.886-2.835-17.886-5.405V87.09c5.667 2.304 11.776 3.544 17.886 3.544 6.11 0 12.13-1.152 17.885-3.544v6.822c0 2.57-7.349 5.405-17.885 5.405zM19.479 46.513c-9.208 0-18.948 2.304-19.125 6.556V93.824c0 4.34 9.828 6.733 19.125 6.733s19.125-2.303 19.125-6.733V53.158c-.177-4.341-9.916-6.645-19.125-6.645zm17.797 27.288v1.506c-11.333 4.784-24.349 4.784-35.682 0v-8.948c5.666 2.303 11.776 3.544 17.885 3.544 6.11 0 12.13-1.152 17.886-3.544V73.8h-.089zM1.594 76.725c5.666 2.303 11.776 3.543 17.885 3.543 6.11 0 12.13-1.151 17.886-3.543v8.948c-11.334 4.784-24.35 4.784-35.683 0v-8.948h-.088zm35.682-13.29v1.506c-11.333 4.784-24.349 4.784-35.682 0v-9.126c3.01 2.747 10.625 4.165 17.885 4.165 7.26 0 14.875-1.506 17.797-4.164v7.62zM19.479 47.842c10.537 0 17.886 2.835 17.886 5.404 0 2.57-7.35 5.405-17.886 5.405S1.594 55.816 1.594 53.246c0-2.569 7.349-5.404 17.885-5.404zm0 51.475c-10.536 0-17.885-2.835-17.885-5.405V87.09c5.666 2.304 11.776 3.544 17.885 3.544 6.11 0 12.13-1.152 17.886-3.544v6.822c-.089 2.57-7.35 5.405-17.886 5.405z' />
        </Svg.G>
      </Svg>
    )
  }
}