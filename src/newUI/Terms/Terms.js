import React from 'react'
import { StyleSheet, WebView, ScrollView } from 'react-native'
import { LinearGradient } from 'expo'

import View from '../View'
import Text from '../Text'
import Checkbox from '../Checkbox'

const contentPaddingBottom = 50

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewContent: {
    paddingBottom: contentPaddingBottom
  },
  confirmContainer: {
    marginTop: 10
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    height: 60
  }
})

const transparent = 'rgba(255,255,255,0.5)'
const opaque = 'rgba(255,255,255,1)'

export default class Terms extends React.PureComponent {
  render () {
    const { onLoadEnd, confirmed, onConfirmChanged, confirmText, uri, children, hideCheckbox } = this.props

    return (
      <View style={styles.container}>
        {uri ? (
          <WebView
            source={{ uri }}
            onLoadEnd={() => onLoadEnd && onLoadEnd()}
          />
        ) : (
          <React.Fragment>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text>
                {children}
              </Text>
            </ScrollView>

            <LinearGradient colors={[ transparent, opaque ]} style={styles.gradient} />
          </React.Fragment>
        )}

        { !hideCheckbox && (
          <View style={styles.confirmContainer}>
            <Checkbox label={confirmText} checked={confirmed} onChange={onConfirmChanged} />
          </View>
        )}

      </View>
    )
  }
}
