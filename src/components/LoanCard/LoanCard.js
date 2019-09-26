import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, Typography, Card, Spacing } from '~/newUI'
import LoanCardHeader from '~/components/LoanCardHeader'

const styles = StyleSheet.create({
  component: {
    marginBottom: Spacing.s6
  },
  footer: {
    paddingVertical: Spacing.s5,
    borderTopWidth: 1,
    borderTopColor: Colors.dashed,
    flexDirection: 'row',
    marginHorizontal: Spacing.s6,
    justifyContent: 'space-between'
  }
})

export default class LoanCard extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const currentPicture = this.props.borrower.smallProfilePicture
    const nextPicture = nextProps.borrower.smallProfilePicture
    const shouldUpdate = !!nextPicture && currentPicture !== nextPicture

    return shouldUpdate
  }

  render () {
    const {
      onPress,
      score,
      header,
      footer
    } = this.props

    const scoreColor = Colors[`score${score}`]
    const { title, subtitle, description } = header
    return (
      <Card outerStyle={styles.component} onPress={onPress}>
        <LoanCardHeader
          title={title}
          titleColor={Colors.mutualBlue}
          subtitle={subtitle}
          description={description}
          {...this.props}
        />

        { footer && (
          <View style={styles.footer}>
            {footer.map((info, index) => {
              return (
                <View key={index}>
                  <View>
                    <Typography.T4 adaptSize color={Colors.warmGray}>{info.text}</Typography.T4>
                  </View>
                  <View>
                    <Typography.T4 adaptSize variant={'bold'} color={scoreColor}>{info.value}</Typography.T4>
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </Card>
    )
  }
}
