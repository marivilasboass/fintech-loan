import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Sentry from 'sentry-expo'
import { ImagePicker, Permissions } from 'expo'
import { resetNavigationTo } from '~/services/navigation'
import { View, Typography, Colors, Spacing } from '~/newUI'
import accountStatuses from '~/constants/accountStatuses'
import BackgroundProfile from '~/components/UserProfileHeader/components/BackgroundProfile'
import UploadingError from './components/UploadingError'
import UploadingWarning from './components/UploadingWarning'
import { openAppLocationSettings } from '~/services/location'
import { Loader } from '~/UI'
import EditPictureIcon from './icon/EditPictureIcon'

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 85,
    height: 30,
    borderRadius: 6,
    backgroundColor: Colors.black60,
    flexDirection: 'row',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  pictureLoader: {
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    margin: Spacing.s8
  }
})

export default class TopPicture extends React.PureComponent {
  state = {
    loading: false,
    showError: false,
    profileImage: null,
    showWarning: false
  }

  logoutPressed = async () => {
    await this.props.logout()

    const rootNavigation = this.props.screenProps.screenProps.navigation
    resetNavigationTo(
      rootNavigation,
      { routePath: ['Intro'] }
    )
  }

  changeProfileImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      await openAppLocationSettings()
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })
    if (!result.cancelled) {
      this.setState({ profileImage: result, showWarning: false }, () => {
        this.uploadProfileImage()
      })
    }
  };

  uploadProfileImage = async () => {
    const { profileImage } = this.state

    if (!profileImage) {
      return
    }

    this.setState({ loading: true, showError: false })

    try {
      await this.props.submitSingleDocument('tempProfilePicture', profileImage)

      this.props.update({
        smallProfilePicture: profileImage.uri,
        largeProfilePicture: profileImage.uri
      })

      this.setState({ loading: false })
    } catch (err) {
      if (this.state.loading) {
        this.setState({ loading: false, showError: true })
        Sentry.captureException(err)
      }
    }
  }

  showUploadWarning = () =>
    this.setState({ loading: false, showWarning: true });

  render () {
    const { profilePicture, status, nickname, age } = this.props
    const { loading, showError, showWarning } = this.state
    const canEditPicture = profilePicture && status === accountStatuses.approved

    return (
      <View>
        {showError && (
          <UploadingError
            isVisible={showError}
            onCancel={() => this.setState({ showError: false })}
            retryUpload={this.uploadProfileImage}
            resetUpload={this.changeProfileImage}
          />
        )}

        {showWarning && (
          <UploadingWarning
            isVisible={showWarning}
            onCancel={() => this.setState({ showWarning: false })}
            openGalery={this.changeProfileImage}
          />
        )}

        {canEditPicture && !loading &&
        (
          <TouchableWithoutFeedback onPress={this.showUploadWarning}>
            <View style={styles.editButton}>
              <EditPictureIcon />
              <Typography.T4 variant={'bold'} color={Colors.white}>Editar</Typography.T4>
            </View>
          </TouchableWithoutFeedback>
        )
        }

        {loading
          ? <Loader.Footer style={styles.pictureLoader} />
          : null
        }

        {profilePicture
          ? (
            <BackgroundProfile
              user={{ nickname, age, largeProfilePicture: profilePicture }}
            />
          )
          : (
            <View style={[styles.title]}>
              <Typography.H5 color={Colors.marineBlue}>{nickname}</Typography.H5>
              {age > 0 && <Typography.T2 color={Colors.warmGray}>{age} anos</Typography.T2>}
            </View>
          )
        }

      </View>
    )
  }
}
