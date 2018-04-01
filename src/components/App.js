import React from 'react';
import styled from 'styled-components';

import Playground from '@components/pages/Playground'
import DragDropHandler from '@components/smarts/DragDropHandler'

const Root = styled.div`
  height: 100%;
  font-family: 'Regular';
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
