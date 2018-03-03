import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Playground from '@components/pages/Playground'

const Root = styled.div`
  background: #aaa;
  height: 100%;
`;

export default class App extends React.Component {
  render() {
    return (
      <DragDropContext>
        <Root>
            <Playground />
        </Root>
      </DragDropContext>
    );
  }
}
