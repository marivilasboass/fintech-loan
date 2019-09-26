import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Shadow, View, Touch, Spacing } from '~/newUI'
import pencilImage from '../images/pencil.png'

const pictureHeight = 317

const styles = StyleSheet.create({
  container: {
    padding: Spacing.s2,
    paddingBottom: Spacing.s2 + 2
  },

  pencilIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 6,
    right: 12
  },

  pictureContainer: {
    borderRadius: 10,
    width: '100%',
    height: pictureHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },

  multiplePictureContainer: {
    height: pictureHeight / 2
  },

  picture: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 6
  },

  rotatedPicture: {
    width: pictureHeight / 2,
    height: pictureHeight,
    transform: [
      { rotate: '-90deg' }
    ]
  }
})

export default class PicturePreview extends React.Component {
  render () {
    const { pictures, onEdit } = this.props
    const isMultiple = pictures.length > 1

    return (
      <Shadow x={3} y={3} layout='fillWidth' radius={10}>
        <View style={styles.container}>
          {pictures.map((picture, i) => (
            <View key={`picture_${i}`} style={[styles.pictureContainer, isMultiple && styles.multiplePictureContainer, i === 0 && { marginBottom: 1 }]}>
              <Touch onPress={() => onEdit(i)}>
                <Image source={pencilImage} style={styles.pencilIcon} />
              </Touch>

              {picture && (
                <Image
                  source={picture}
                  resizeMode='cover'
                  style={[
                    styles.picture,
                    isMultiple && (picture.height > picture.width) && styles.rotatedPicture
                  ]}
                />
              )}
            </View>
          )
          )}
        </View>
      </Shadow>
    )
  }
}
