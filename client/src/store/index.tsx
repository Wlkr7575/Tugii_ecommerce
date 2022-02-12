import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import root from './reducer'
const initState = {}
const middleware = [thunk]
const store = createStore(root,initState,composeWithDevTools(applyMiddleware(...middleware)))
export default store