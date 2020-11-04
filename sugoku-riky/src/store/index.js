import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducer/boardReducer'
import backUpBoardReducer from './reducer/backUpBoardReducer'

const store = createStore(combineReducers({
  boardReducer,
  backUpBoardReducer
}), applyMiddleware(thunk))

export default store;