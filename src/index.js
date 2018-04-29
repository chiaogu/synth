import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
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

const core = new Core();
const store = createStore(
  reducers,
  applyMiddleware(core.middleware())
)

ReactDOM.render(
  <Provider store={store}>
    <Root>
      <App />
      <Storage />
    </Root>
  </Provider>,
  document.getElementById('app')
)