import React from 'react'
import { StyleSheet } from 'react-native'

import { Input, Selector } from '~/newUI'
import PendencyPage from '~/components/PendencyPage'

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start'
  }
})

export default class MaritalStatus extends React.PureComponent {
  render () {
    const { civilState, maritalStatus, spouseName, onCancel, onNext, handleCivilState, handleSpouseName, handleMaritalStatus } = this.props
    const nextEnabled = civilState === 'single' || civilState === 'widower' || (civilState === 'married' && maritalStatus !== '' && spouseName !== '')

    return (
      <PendencyPage
        title='Qual seu estado civil?'
        contentStyle={styles.content}
        disabled={!nextEnabled}
        onBack={onCancel}
        onCancel={onCancel}
        onNext={onNext}
      >
        <Selector
          value={civilState}
          label='Estado Civil'
          onChange={handleCivilState}
          data={[{ value: 'single', label: 'Solteiro(a)' }, { value: 'married', label: 'Casado' }, { value: 'widower', label: 'Viúvo' }]}
        />

        {civilState === 'married' ? (
          <Selector
            style={{ marginTop: 44, marginBottom: 44 }}
            label='Regime'
            value={maritalStatus}
            onChange={handleMaritalStatus}
            data={[{ value: 'totalUnionMarriage', label: 'Comunhão total de bens' }, { value: 'partialMarriage', label: 'Comunhão parcial de bens' }, { value: 'totalSeparationMarriage', label: 'Separação total de bens' }]} />
        ) : null}

        {civilState === 'married' && maritalStatus !== '' ? (
          <Input
            value={spouseName}
            label='Nome do cônjuge'
            onChange={handleSpouseName}
          />
        ) : null }

      </PendencyPage>
    )
  }
}
