import React, { Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Colors from '../Colors'
import Options from './components/Options'
import Icon from '../Icon'
import View from '../View'
import Text from '../Text'

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 0,
    top: 5,
    fontSize: 28,
    color: Colors.black,
    transform: [{ scaleX: 0.8 }, { scaleY: 1 }],
    borderRadius: 0,
    alignItems: 'flex-end'
  },
  container: {
    justifyContent: 'flex-start'
  },
  input: {
    borderWidth: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingBottom: 8,
    justifyContent: 'space-between'
  },
  inputText: {
    fontSize: 16,
    paddingTop: 6,
    alignItems: 'flex-start',
    color: Colors.text
  }
})

export default class Select extends Component {
   state = {
     modalVisible: false
   }

   static defaultProps = {
     onChange: () => { throw new Error('Selector sem onChange') },
     optionsMaxHeight: 400,
     label: ' '
   }

   onChange (value) {
     this.props.onChange(value)
   }

   toggleSelector = () => {
     const { modalVisible } = this.state

     this.setState({ modalVisible: !modalVisible })
   }

   render () {
     const { modalVisible } = this.state
     const { data = [], optionsMaxHeight, style, value, label } = this.props

     const selected = data ? data.filter(i => i.value === value)[0] : null

     return (
       <View style={[styles.container].concat(style)}>
         <Options
           optionsMaxHeight={optionsMaxHeight}
           modalVisible={modalVisible}
           data={data}
           toggleSelector={() => this.toggleSelector()}
           onChange={(option) => this.onChange(option)}
           value={value}
         />
         <TouchableWithoutFeedback
           onPress={() => this.toggleSelector()}
         >
           <View style={styles.input}>
             <Text style={[styles.inputText]}>{selected ? selected.label : label}</Text>
             <Icon style={[styles.icon]} name='arrowDownMini' type='mutual' />
           </View>
         </TouchableWithoutFeedback>
       </View>
     )
   }
}

Select.Options = Options
