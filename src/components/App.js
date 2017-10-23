import React from 'react';
import styled from 'styled-components';

import Playground from '@components/pages/Playground'

const Root = styled.div`
  background: #aaa;
  padding-top: 8px;
  height: 100%;
`;

const PageWrapper = styled.div`
  background: #fff;
  flex: 1 1 auto;
  margin: 0 8px 8px 8px;
  padding: 8px;
`;

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <PageWrapper>
          <Playground />
        </PageWrapper>
      </Root>
    );
  }
}
