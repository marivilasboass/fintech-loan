import React from 'react'
import { StyleSheet } from 'react-native'

import PendencyPage from '~/components/PendencyPage'
import { RadioGroup } from '~/newUI'
import genders from '~/constants/genders'

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
})

export default class GenderSelector extends React.PureComponent {
  render () {
    const { onCancel, onBack, gender, onNext, handleGender, loading } = this.props
    const options = Object.keys(genders).map(key => ({ value: key, label: genders[key] }))

    return (
      <PendencyPage
        contentStyle={styles.content}
        noScroll
        onCancel={onCancel}
        disabled={!gender}
        loading={loading}
        onNext={onNext}
        onBack={onBack}
        title='Qual é o seu gênero?'
      >
        <RadioGroup
          items={options}
          value={gender}
          onChange={handleGender}
        />
      </PendencyPage>
    )
  }
}
