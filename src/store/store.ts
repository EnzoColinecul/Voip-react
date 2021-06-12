import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer';
import { sipReducer } from '../reducers/sipReducer';
import { uiReducer } from '../reducers/uiReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  sip: sipReducer
})


export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch