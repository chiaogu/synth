import React from 'react';
import styled from 'styled-components';

import Playground from '@components/pages/Playground'

const Root = styled.div`
  background: #aaa;
  padding-top: 8px;
  height: 100%;
`;

export default class App extends React.Component {
  render() {
    return (
      <Root>
          <Playground />
      </Root>
    );
  }
}
