import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'

import PendencyPage from '~/components/PendencyPage'
import { View, Spacing } from '~/newUI'
import SearchList from '~/newUI/SearchList'
import ProfessionList from '../json/professions.json'
import SelectableListItem from '~/newUI/SelectableListItem/index.js'

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start'
  },
  listContainer: {
    flex: 1,
    position: 'relative'
  },
  gradient: {
    height: Spacing.s6,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

const transparent = 'rgba(255,255,255,0.5)'
const opaque = 'rgba(255,255,255,1)'

export default class Profession extends React.PureComponent {
  render () {
    const { onCancel, onBack, occupation, handleOccupation, onNext, loading } = this.props
    return (
      <PendencyPage
        contentStyle={styles.content}
        noScroll
        onCancel={onCancel}
        loading={loading}
        disabled={!occupation}
        onNext={onNext}
        onBack={onBack}
        title='Qual é a sua profissão?'
        description='Informe apenas o valor que possa ser comprovado'
      >
        <View style={styles.listContainer}>
          <SearchList
            threshold={0.3}
            inputProps={{
              placeholder: 'Busque sua profissão aqui'
            }}
            list={ProfessionList}
            listTitle='Selecione uma das opções abaixo:'
            listKey='value'
            selected={occupation}
            onSelectItem={handleOccupation}
            filterableKeys={['value', 'synonyms']}
            ListItemComponent={SelectableListItem}
          />
          <LinearGradient colors={[transparent, opaque]} style={styles.gradient} />
        </View>
      </PendencyPage>
    )
  }
}
