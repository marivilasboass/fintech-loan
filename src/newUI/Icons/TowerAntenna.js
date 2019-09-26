import React, { PureComponent } from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class TowerAntenna extends PureComponent {
  static defaultProps = {
    color: Colors.nightRider
  }

  render () {
    const { color, ...props } = this.props
    return (
      <Svg width={156} height={171} viewBox='0 0 156 171' {...props}>
        <Svg.G fillRule='evenodd' fill='none'>
          <Svg.Path d='M2.874 13.092c.134.267.401.267.668.267s.535 0 .802-.267c.4-.4.4-1.069 0-1.47l-2.271-2.27c-.401-.401-1.07-.401-1.47 0-.4.4-.4 1.068 0 1.47l2.271 2.27zM10.355 20.573c.134.134.401.268.668.268.268 0 .535-.134.668-.268.401-.4.401-1.068 0-1.47l-2.27-2.27c-.401-.401-1.07-.401-1.47 0-.401.4-.401 1.069 0 1.47l2.404 2.27zM4.344 16.833c-.401-.401-1.069-.401-1.47 0l-2.27 2.27c-.402.402-.402 1.07 0 1.47.133.134.4.268.667.268s.534-.134.668-.268l2.405-2.27c.4-.401.4-1.07 0-1.47zM8.752 13.36c.268 0 .535-.134.668-.268l2.271-2.27c.401-.402.401-1.07 0-1.47-.4-.401-1.068-.401-1.47 0l-2.27 2.27c-.401.401-.401 1.07 0 1.47.267.267.534.267.801.267zM105.741 83.229c-.4-.4-1.068-.4-1.47 0-.4.4-.4 1.069 0 1.47l2.272 2.27c.134.134.4.268.668.268.267 0 .534-.134.668-.267.4-.401.4-1.07 0-1.47l-2.138-2.271zM113.09 90.71c-.402-.4-1.07-.4-1.47 0-.401.4-.401 1.069 0 1.47l2.27 2.27c.134.134.401.268.669.268.267 0 .534-.134.668-.267.4-.401.4-1.069 0-1.47l-2.138-2.27zM106.543 90.71l-2.271 2.271c-.4.401-.4 1.069 0 1.47.133.133.4.267.668.267.267 0 .534-.134.668-.267l2.27-2.271c.402-.401.402-1.07 0-1.47-.266-.4-.934-.4-1.335 0zM114.024 83.229l-2.27 2.271c-.402.4-.402 1.069 0 1.47.133.133.4.267.667.267s.534-.134.668-.267l2.271-2.272c.4-.4.4-1.068 0-1.47-.4-.4-.935-.4-1.336 0z' fill={Colors.shadowGray} />
          <Svg.Path d='M132.594 139.338c-2.806 0-5.21 2.271-5.21 5.21 0 2.806 2.27 5.21 5.21 5.21 2.805 0 5.21-2.27 5.21-5.21 0-2.805-2.271-5.21-5.21-5.21zm0 8.417c-1.737 0-3.207-1.47-3.207-3.207 0-1.736 1.47-3.206 3.207-3.206 1.736 0 3.206 1.47 3.206 3.206 0 1.737-1.47 3.207-3.206 3.207zM33.2 90.443c-2.805 0-5.21 2.271-5.21 5.21 0 2.806 2.27 5.21 5.21 5.21 2.805 0 5.21-2.27 5.21-5.21 0-2.939-2.27-5.21-5.21-5.21zm0 8.283c-1.737 0-3.206-1.47-3.206-3.206 0-1.737 1.47-3.207 3.206-3.207 1.737 0 3.206 1.47 3.206 3.207 0 1.87-1.47 3.206-3.206 3.206z' fill={Colors.shadowGray} fillRule='nonzero' />
          <Svg.Path d='M68.87 2.672h18.836c.535 0 1.069-.4 1.069-1.069 0-.668-.4-1.069-1.069-1.069H68.87c-.535 0-1.07.401-1.07 1.07 0 .667.535 1.068 1.07 1.068zM93.985 2.672h6.145c.535 0 1.07-.4 1.07-1.069 0-.668-.402-1.069-1.07-1.069h-6.145c-.534 0-1.069.401-1.069 1.07 0 .667.535 1.068 1.07 1.068zM101.066 8.15c0-.535-.401-1.07-1.07-1.07H86.772c-.534 0-1.069.401-1.069 1.07 0 .667.401 1.068 1.07 1.068h13.225c.668 0 1.069-.534 1.069-1.069zM77.019 7.214c-.535 0-1.069.4-1.069 1.069 0 .668.4 1.069 1.069 1.069h4.275c.534 0 1.069-.401 1.069-1.07 0-.667-.535-1.068-1.07-1.068H77.02zM35.738 138.002H16.902c-.535 0-1.07.401-1.07 1.07 0 .533.402 1.068 1.07 1.068h18.836c.535 0 1.069-.4 1.069-1.069 0-.668-.534-1.069-1.069-1.069zM10.623 138.002H4.477c-.534 0-1.068.401-1.068 1.07 0 .533.4 1.068 1.068 1.068h6.146c.534 0 1.068-.4 1.068-1.069 0-.668-.534-1.069-1.068-1.069zM3.542 132.525c0 .534.401 1.069 1.069 1.069h13.092c.535 0 1.069-.401 1.069-1.069 0-.534-.4-1.069-1.069-1.069H4.477c-.534.134-.935.535-.935 1.069zM22.379 132.525c0 .534.4 1.069 1.069 1.069h4.275c.534 0 1.068-.401 1.068-1.069 0-.534-.4-1.069-1.068-1.069h-4.275c-.668.134-1.07.535-1.07 1.069zM143.014 103.669c0-.535-.4-1.069-1.069-1.069H123.11c-.535 0-1.07.4-1.07 1.069 0 .534.402 1.069 1.07 1.069h18.836c.668-.134 1.07-.535 1.07-1.07zM148.224 104.604h6.146c.534 0 1.068-.4 1.068-1.069 0-.534-.4-1.069-1.068-1.069h-6.146c-.534 0-1.069.401-1.069 1.07.134.667.535 1.068 1.07 1.068zM154.37 109.146h-13.226c-.535 0-1.069.4-1.069 1.069 0 .668.4 1.069 1.069 1.069h13.226c.534 0 1.068-.401 1.068-1.07 0-.667-.534-1.068-1.068-1.068zM131.258 109.146c-.535 0-1.069.4-1.069 1.069 0 .668.4 1.069 1.069 1.069h4.275c.534 0 1.069-.401 1.069-1.07 0-.667-.401-1.068-1.07-1.068h-4.274zM145.285 32.597c.535 0 1.069-.4 1.069-1.069V11.222c0-.534-.4-1.069-1.069-1.069-.534 0-1.069.4-1.069 1.069v20.306c0 .535.401 1.069 1.07 1.069zM145.285 45.69c.535 0 1.069-.402 1.069-1.07v-6.546c0-.534-.4-1.069-1.069-1.069-.534 0-1.069.401-1.069 1.07v6.545c0 .668.401 1.07 1.07 1.07zM7.55 76.015c.534 0 1.069-.4 1.069-1.069V54.773c0-.534-.401-1.068-1.069-1.068-.534 0-1.069.4-1.069 1.068V75.08c.134.534.535.935 1.069.935zM7.55 89.24c.534 0 1.069-.4 1.069-1.068v-6.546c0-.535-.401-1.069-1.069-1.069-.534 0-1.069.4-1.069 1.069v6.546c.134.668.535 1.069 1.069 1.069z' fill={Colors.shadowGray} />
          <Svg.Path d='M104.005 162.85l-4.676-17.634-.4-1.736-3.742-14.428-.4-1.47-3.34-12.959-1.202-4.675-2.539-9.753-2.137-8.015-1.737-6.546-5.477-20.975c4.81-.534 9.351-2.27 9.351-5.343s-4.676-4.81-9.752-5.344V41.948c0-.534-.4-1.068-1.069-1.068h-3.607c-.534 0-1.069.4-1.069 1.068v12.024c-5.076.534-9.752 2.271-9.752 5.344 0 3.072 4.542 4.809 9.352 5.343L66.33 85.634l-1.603 6.546-2.137 7.882-2.539 9.752-1.202 4.676-3.34 12.958-.4 1.604-3.741 14.428-.401 1.736-4.676 17.635-1.603 6.145c-.134.534.134 1.069.668 1.202h.267c.401 0 .802-.267.935-.801l1.47-5.611 27.12-10.153 27.119 10.287 1.47 5.61c.133.401.534.802.935.802h.267c.534-.134.801-.668.668-1.202l-1.603-6.28zm-7.214-19.637l-.802.267-10.02-3.875-7.881-3.072 15.496-6.012 3.207 12.692zm-4.409-17.1l-14.428-5.478 11.756-4.542 2.672 10.02zm-6.412-24.448l1.736 6.813-9.752-3.74 8.016-3.073zm-2.806-10.821l-.802-.267-4.274-1.604 2.671-1.068 1.47-.535.935 3.474zm-8.817-47.96h1.47v10.954H74.48V42.884h-.134zm-9.619 16.432c0-1.336 4.008-3.474 10.153-3.474h.668c6.28.134 10.153 2.138 10.153 3.474 0 1.202-3.072 3.072-8.683 3.473H73.278c-5.61-.4-8.55-2.271-8.55-3.473zm9.352 5.477H76.217l5.344 20.573-2.004.802-4.409 1.603-3.607-1.336-2.939-1.069 5.478-20.573zm-5.878 22.444l3.206 1.202 1.069.4-5.21 2.005.935-3.607zm-1.604 6.011l8.55-3.34 8.55 3.207 1.737 6.546-10.287 4.008-7.08-2.672-3.34-1.202 1.87-6.547zm-2.27 8.417l8.015 3.072-.668.268-9.218 3.473 1.87-6.813zm-2.405 9.218l13.225-5.077 13.226 5.077.802 3.34-14.028 5.343-12.424-4.809-1.603-.668.802-3.206zm-1.336 5.21l10.153 3.874 1.603.668-14.428 5.477 2.672-10.019zm-3.207 12.424l17.768-6.813 17.768 6.813v.134l-17.768 6.813-17.768-6.947zm-.534 2.138l15.63 6.011-18.035 6.947-.801-.267 3.206-12.691zm-8.15 30.86l4.009-15.363 1.603-.668 18.035 6.946-23.646 9.085zm26.452-10.153l-2.805-1.069-15.23-5.878 18.035-6.813 5.478 2.137 12.558 4.81-14.562 5.61-3.474 1.203zm2.806 1.202l18.035-6.947 1.603.668 4.008 15.23-23.646-8.95zM83.832 42.483c0 5.21 2.94 9.218 6.546 9.218.534 0 1.069-.401 1.069-1.069V34.334c0-.535-.4-1.07-1.069-1.07-3.607 0-6.546 4.009-6.546 9.219zm5.611 6.947c-2.004-.802-3.473-3.607-3.473-6.947s1.47-6.28 3.473-6.947V49.43z' fill={Colors.nightRider} fillRule='nonzero' />
          <Svg.Path d='M118.566 16.165c-.4-.4-1.068-.4-1.47 0-.4.4-.4 1.069 0 1.47 6.68 6.68 10.288 15.496 10.288 24.848 0 9.351-3.607 18.302-10.287 24.848-.4.401-.4 1.069 0 1.47.133.133.4.267.668.267.267 0 .534-.134.668-.267 7.08-7.08 10.954-16.432 10.954-26.318 0-10.02-3.874-19.371-10.82-26.318z' fill={Colors.lightPink} />
          <Svg.Path d='M110.55 24.18c-.4-.4-1.068-.4-1.469 0-.4.401-.4 1.07 0 1.47 4.542 4.542 6.947 10.554 6.947 16.833 0 6.412-2.538 12.424-6.947 16.833-.4.4-.4 1.068 0 1.47.134.133.401.266.668.266s.535-.133.668-.267c4.943-4.943 7.615-11.355 7.615-18.302.134-6.947-2.672-13.493-7.481-18.303zM101.066 33.532c2.404 2.405 3.74 5.477 3.74 8.95 0 3.34-1.336 6.547-3.74 8.952-.401.4-.401 1.068 0 1.47.133.133.4.266.668.266.267 0 .534-.133.668-.267 2.805-2.805 4.275-6.412 4.275-10.287 0-3.874-1.47-7.614-4.275-10.286-.401-.401-1.07-.401-1.47 0-.267.133-.267.801.134 1.202z' fill={Colors.lightPink} />
          <Svg.Path d='M59.919 51.567c3.607 0 6.546-4.008 6.546-9.218s-2.94-9.218-6.546-9.218c-.535 0-1.069.401-1.069 1.069v16.298c.134.668.534 1.07 1.069 1.07zm1.069-16.165c2.003.802 3.473 3.607 3.473 6.947s-1.47 6.28-3.474 6.947V35.402z' fill={Colors.nightRider} fillRule='nonzero' />
          <Svg.Path d='M32.532 69.068c.267 0 .534-.134.668-.267.4-.401.4-1.069 0-1.47-6.68-6.68-10.287-15.497-10.287-24.848 0-9.352 3.607-18.303 10.287-24.849.4-.4.4-1.068 0-1.47-.4-.4-1.069-.4-1.47 0-7.08 7.081-10.954 16.433-10.954 26.319S24.65 61.72 31.73 68.8c.268.133.535.267.802.267z' fill={Colors.lightPink} />
          <Svg.Path d='M41.216 24.18c-.401-.4-1.07-.4-1.47 0-10.153 10.154-10.153 26.586 0 36.605.134.134.4.267.668.267.267 0 .534-.133.668-.267.4-.4.4-1.069 0-1.47-9.352-9.35-9.352-24.447 0-33.799.534-.4.534-.935.134-1.336zM48.563 53.037c.267 0 .535-.134.668-.267.401-.401.401-1.07 0-1.47-2.404-2.405-3.74-5.477-3.74-8.95 0-3.34 1.336-6.547 3.74-8.952.401-.4.401-1.068 0-1.47-.4-.4-1.069-.4-1.47 0-2.805 2.806-4.274 6.413-4.274 10.288 0 3.874 1.47 7.614 4.275 10.286.267.401.534.535.801.535z' fill={Colors.lightPink} />
        </Svg.G>
      </Svg>
    )
  }
}