import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from '@state/reducers'
import App from '@components/App'
import Core from '@core'

const store = createStore(reducers)
const core = new Core(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app'));