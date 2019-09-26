import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Typography, Colors } from '~/newUI'
import { version } from '~/../config.json'

const styles = StyleSheet.create({
  versionContainer: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 15,
    backgroundColor: Colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  versionText: {
    color: Colors.white,
    alignSelf: 'center'
  }
})

export default class Version extends React.Component {
  state = {
    height: 40
  }
  render () {
    const { height } = this.state
    return (
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          this.setState({ height })
        }}
        style={[styles.versionContainer].concat({ borderRadius: height / 1.8 })}
      >
        <Typography.T4 variant='bold' style={styles.versionText}>Versão {version}</Typography.T4>
      </View>
    )
  }
}
