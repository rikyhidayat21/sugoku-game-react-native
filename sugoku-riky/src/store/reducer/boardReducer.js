import { SET_BOARD, SET_STATUS, SET_LEADER_BOARD } from '../action'

const initialState = {
  board: [],
  statusGame: false,
  leaderBoard: []
}

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case SET_BOARD:
      return {...state, board: action.payload}
    case SET_STATUS:
      return { ...state, statusGame: action.payload}
    case SET_LEADER_BOARD:
      let newLeaderBoard = state.leaderBoard.concat(action.payload)
      return { ...state, leaderBoard: newLeaderBoard}
    default: 
      return state;
  }
}