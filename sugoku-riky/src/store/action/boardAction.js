import { 
  SET_BOARD, 
  SET_BACKUPBOARD, 
  SET_STATUS,
  SET_LEADER_BOARD
 } from './index'
import axios from 'axios'


export const setBoard = (value) => {
  return {
    type: SET_BOARD,
    payload: value
  }
}

export const getBoard = (level) => {
  return dispatch => {
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
      .then(({ data }) => {
        console.log(data, '<=== get board api')
        
        dispatch(setStatusGame(false))
        dispatch(setBoard(data.board))
      })
      .catch(err => console.log(err, '<== error get board di actions'))
  }
}

export const setBackUpBoard = (value) => {
  console.log(value, '<=== setBackupBoard di action')
  const output = []
  value.forEach(el => {
    output.push(el.slice())
  })
  return {
    type: SET_BACKUPBOARD,
    payload: output
  }
}

export const setStatusGame = (value) => {
  return {
    type: SET_STATUS,
    payload: value
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) =>
  result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');


export const getAnswerSudoku = (boardDuplicate) => {
  return function (dispatch) {
    axios.post('https://sugoku.herokuapp.com/solve', encodeParams({ board: boardDuplicate }))
      .then(({ data }) => {
          dispatch(setBoard(data.solution))
          dispatch(setStatusGame(true))
      })
      .catch(err => console.log(err))
  }
}

export const setLeaderBoard = (value) => {
  return {
    type: SET_LEADER_BOARD,
    payload: value
  }
}