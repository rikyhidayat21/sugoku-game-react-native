import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Dimensions, TextInput, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getBoard, getAnswerSudoku, setLeaderBoard } from '../store/action/boardAction';
import axios from 'axios'

export default function Game({ route, navigation }) {

  const dispatch = useDispatch()
  const [boardDuplicate, setBoardDuplicate] = useState([]) // dari lecture
  const board = useSelector(state => state.boardReducer.board)
  const { nickname, level } = route.params
  const statusGame = useSelector(state => state.boardReducer.statusGame)

  useEffect(() => {
    dispatch(getBoard(level)) // nanti disini ditambah level
  }, [dispatch])

  useEffect(() => {
    setBoardDuplicate(board)
  }, [board])

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object
      .keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  const checkAnswer = () => {
    axios
      .post('https://sugoku.herokuapp.com/validate', encodeParams({ board }))
      .then(response => {
        if (response.data.status !== 'solved') {
          Alert.alert('Failed!', 'Keep Trying')
        } else {
            // dispatch(setLeaderBoard(playerName))
          if (statusGame) {
            Alert.alert('COOL!', 'LETS FLY HIGHER!')
            navigation.replace('Finish', {
              nickname
            })
            dispatch(setLeaderBoard(nickname))

          } else {
            dispatch(setLeaderBoard({ nickname }))
            navigation.replace('Finish')
          }
        }
          
      })
      .catch(err => console.log(err))
  }


  function onChangeInput (text, rowIndex, colIndex) {
    const cloneBoard = JSON.parse(JSON.stringify(boardDuplicate))
    cloneBoard[rowIndex][colIndex] = text

    setBoardDuplicate(cloneBoard)
  }

  const solveSudoku = () => {
    dispatch(getAnswerSudoku(boardDuplicate))
  }
  
  // bikin function handle change, buat dispatch store yg board
  return (
    <>
      <View style={{
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#007AFF',
        padding: 5,
      }}>

        <Text style={{ 
          color: '#fff', 
          fontWeight: '700',
          textAlign: 'center',
          padding: 3
           
          }}
          >Hello, { nickname.toUpperCase() } ! Enjoy your {level} level !
        </Text>

      </View>
      <View style={styles.container}>

        { boardDuplicate.map((row, rowIndex) => {
          return (
            <View style={{flexDirection: 'row'}}>
              { row.map((col, colIndex) => (
                <View style={styles.row}>
                  <TextInput 
                    style={styles.col}
                    keyboardType="numeric"
                    maxLength={1}
                    value={col ? col.toString() : ''}
                    onChangeText={(text) => onChangeInput(text, rowIndex, colIndex)}
                    editable={board[rowIndex][colIndex] === 0 ? true: false}
                  />
                </View>
              ))}
            </View>
          )
        })}

        <View style={{ marginTop: 40, marginHorizontal: 20, flexDirection: 'row', margin: 1}}>
          <Button 
            style={{ padding: 1}}
            title="SUBMIT"
            onPress={() => checkAnswer()}
          />

          <Button 
            title="SOLVE"
            onPress={() => solveSudoku()}
          />
        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbe2ef',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    borderWidth: 1,
    borderColor: '#007AFF',
    textAlign: 'center',
    margin: 1
  },
  col: {
    textAlign: 'center',
    color: '#007AFF'
  }
});

const windowWidth = Dimensions.get('window').width