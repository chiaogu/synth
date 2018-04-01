import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducers from '@state/reducers'
import App from '@components/App'
import Core from '@core'
import './styles'

const core = new Core();
const store = createStore(
  reducers,
  applyMiddleware(core.middleware())
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app'));