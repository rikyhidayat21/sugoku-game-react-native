import { SET_BACKUPBOARD } from '../action'

const initialState = {
  backUpBoard: []
}

export default function backUpBoardReducer(state = initialState, action) {
  if (action.type === SET_BACKUPBOARD) {
    return { ...state, backUpBoard: action.payload}
  }
  return state;
}