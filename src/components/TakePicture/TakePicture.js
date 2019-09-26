import React from 'react'
import { StyleSheet, View, Image, Platform } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Icon } from 'react-native-elements'
import Sentry from 'sentry-expo'

import { Touch, NoResultsView } from '~/UI'
import Colors from '~/newUI/Colors'

import ShutterButton from './components/ShutterButton'
import Overlay from './components/Overlay'

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  takePictureWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 30
  },
  shutterButton: {
    marginBottom: 30
  },
  iconButton: {
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 3
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  flipImage: {
    transform: [{ rotateY: '180deg' }]
  },
  rejectButton: {
    borderColor: Colors.red
  },
  acceptButton: {
    borderColor: Colors.brightBlue
  }
})

// Our most preferred ratio is 16:9, however not all Android devices support it
const preferredRatios = ['16:9', '4:3']
// iOS allows any ratio, android defaults to 4:3
const initialRatio = Platform.OS === 'android' ? '4:3' : '16:9'

export default class TakePicture extends React.PureComponent {
  static defaultProps = {
    onPicture: () => { throw new Error('TakePicture expects onPicture') },
    onCancel: () => { throw new Error('TakePicture expects onCancel') },
    useBackCamera: true,
    overlayMessage: null
  }

  state = {
    hasCameraPermission: null,
    loading: false,
    picture: null,
    ratio: initialRatio,
    supportedRatios: []
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)

    const hasCameraPermission = status === 'granted'

    this.setState({ hasCameraPermission })
  }

  setBestRatio = async () => {
    if (Platform.OS !== 'android' || !this.camera) {
      return
    }

    // If the ratio prop is used, set it as the most preferred ratio
    if (this.props.ratio) {
      preferredRatios.unshift(this.props.ratio)
    }

    const supportedRatios = await this.camera.getSupportedRatiosAsync()
    const supportedPreferredRatios = preferredRatios.filter(r => supportedRatios.includes(r))

    // Get the first available preferred ratio. If there's none use the largest supported one
    const ratio = supportedPreferredRatios[0] || supportedRatios[supportedRatios.length - 1]
    this.setState({ ratio, supportedRatios })
  }

  handleError = (error) => {
    const { ratio, supportedRatios } = this.state
    Sentry.captureException(new Error(error.message), { ratio, supportedRatios })
  }

  handleAccept = async () => {
    this.props.onPicture(this.state.picture)
    this.setState({ picture: null })
  }

  handleReject = () => {
    if (this.state.picture !== null) {
      this.setState({ picture: null })
    } else {
      this.props.onCancel()
    }
  }

  takePicture = async () => {
    const { loading } = this.state

    if (loading) {
      return
    }

    this.setState({ loading: true })

    try {
      const picture = await this.camera.takePictureAsync({ exif: true, quality: 0.7 })

      this.setState({ loading: false, picture })
    } catch (err) {
      this.setState({ loading: false })

      Sentry.captureException(err)
    }
  }

  render () {
    const { useBackCamera, overlayMessage, overlayImage } = this.props
    const { loading, picture, hasCameraPermission, ratio } = this.state

    const type = useBackCamera
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front

    if (hasCameraPermission === null) {
      return <View />
    }

    if (!hasCameraPermission) {
      return (
        <NoResultsView>
          Precisamos de sua permissão para usar a câmera
        </NoResultsView>
      )
    }

    if (picture) {
      return (
        <View style={styles.camera}>
          <Image source={picture} resizeMode='stretch' style={[styles.previewImage, !useBackCamera && styles.flipImage]} />
          <View style={styles.buttonsWrapper}>
            <Touch onPress={this.handleReject}>
              <View style={[styles.iconButton, styles.rejectButton]}>
                <Icon name='close' color={Colors.red} />
              </View>
            </Touch>
            <Touch onPress={this.handleAccept}>
              <View style={[styles.iconButton, styles.acceptButton]}>
                <Icon name='check' color={Colors.brightBlue} />
              </View>
            </Touch>
          </View>
        </View>
      )
    }

    return (
      <Camera
        ref={ref => { this.camera = ref }}
        onMountError={this.handleError}
        onCameraReady={this.setBestRatio}
        type={type}
        ratio={ratio}
        style={styles.camera}
        zoom={0}
        whiteBalance='auto'
      >
        <Overlay
          message={overlayMessage}
          image={overlayImage}
        />

        <View style={styles.takePictureWrapper}>
          <Touch onPress={this.takePicture}>
            <ShutterButton disabled={loading} style={styles.shutterButton} />
          </Touch>
        </View>
      </Camera>
    )
  }
}
