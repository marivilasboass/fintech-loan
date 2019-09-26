import React from 'react'
import { StyleSheet } from 'react-native'
import QuestionPage from '~/components/Questionnaire/QuestionPage'
import { Card, Checkbox } from '~/newUI'

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black'
  },
  contentStyle: {
    marginLeft: 11
  },
  checkBoxContainer: {
    marginVertical: 10
  }
})

export default class MultipleChoiceQuestion extends React.PureComponent {
  onChange = item => {
    const { answer: checked } = this.props
    let selectedItems = checked && checked.length ? [...checked] : []
    if (selectedItems.includes(item)) {
      selectedItems = selectedItems.filter(selectedItem => selectedItem !== item)
    } else {
      selectedItems.push(item)
    }
    this.props.onChange(selectedItems)
  }

  render () {
    const { answer: checked, choices, ...otherProps } = this.props
    return (
      <QuestionPage {...otherProps} canContinue={checked && checked.length} plainHint >
        { choices.map((item, index) => (
          <Card key={`${item.label}_${item.value}`} outerStyle={{ marginVertical: 5 }} >
            <Checkbox
              key={item.value}
              checked={checked && checked.includes(item)}
              onChange={() => this.onChange(item)}
              textStyle={styles.text}
              boxStyle={styles.contentStyle}
              style={styles.checkBoxContainer}
              label={item.label}
            />
          </Card>
        )) }
      </QuestionPage>
    )
  }
}
