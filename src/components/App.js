import React from 'react'
import styled from 'styled-components'

import Playground from '@components/pages/Playground'
import DragDropHandler from '@components/smarts/DragDropHandler'

const Root = styled.div`
  position: relative;
  height: 100%;
`

export default class App extends React.Component {
  render() {
    return (
      <DragDropHandler>
        <Root>
          <Playground />
        </Root>
      </DragDropHandler>
    );
  }
}
