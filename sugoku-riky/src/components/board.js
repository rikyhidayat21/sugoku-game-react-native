import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function Board(props) {

  // buat validate di textinput buat masukinnya number, 1-9, dan cuma 1 digit, serta si 0 nya dikasi string kosong
  // console.log(props.value, '<=== props value components')

  /**
   * const [boardDuplicate, setBoardDuplicate] = useState([])
   * 
   * onChangeText(text, rowIndex, colIndex) {
   *  const cloneBoard = JSON.parse(JSON.stringify(boardDuplicate))
   *  cloneBoard[rowIndex][colIndex] = text
   *  setBoardDuplicate(cloneBoard)
   * }
   */

  return (
    <View>
      <TextInput 
        value={ String(props.value) } 
        style={{
          borderWidth: 1,
          justifyContent: 'center',
          textAlign: 'center'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
    width: 25,
    height: 25
  },
})

// editable={props.value === 0 ? true: false} tambahin di line 12
// onChangeText={board}