import React from 'react';
import styled from 'styled-components';

import Playground from '@components/pages/Playground'
import DragDropHandler from '@components/smarts/DragDropHandler'

const Root = styled.div`
  background: #aaa;
  height: 100%;
`;

export default class App extends React.Component {
  render() {
    const children = (
      <Root>
          <Playground />
      </Root>
    )

    return (
      <DragDropHandler children={children}/>
    );
  }
}
