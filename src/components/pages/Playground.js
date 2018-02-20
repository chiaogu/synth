import React from 'react';
import styled from 'styled-components';
import Panel from '@components/smarts/Panel';
import Config from '@utils/Config';
import Core from '@utils/Core';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledPanel = styled(Panel)`
  margin: 8px;
`;

export default class Playground extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modules: []
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const modules = Config.getModules();

    this.setState({ modules });
    Core.setModules(modules);
  }

  render() {
    const panels = this.state.modules.map((module, index) => {
      return <StyledPanel key={index} id={index} module={module} />
    });

    return (
      <Root>
        {panels}
      </Root>
    );
  }

}