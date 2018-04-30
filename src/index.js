import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import styled from 'styled-components'

import reducers from '@flow/reducers'
import App from '@components/App'
import Core from '@core'
import Storage from '@storage'
import './styles'

const Root = styled.div`
  position: relative;
  height: 100%;
`

const history = createHistory()

const store = createStore(
  reducers,
  applyMiddleware(
    new Core().middleware(),
    routerMiddleware(history)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Root>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
      <Storage />
    </Root>
  </Provider>,
  document.getElementById('app')
)