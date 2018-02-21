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
    const preset = Config.getPreset();
    const ids = preset.modules.map(module => module.id);

    Config.getModules(ids)
      .then(modules => modules.map((module, index) => ({
        params: preset.modules[index].params,
        config: module
      })))
      .then(modules => {
        Core.setModules(modules);
        this.setState({ modules });
      });
  }

  onParamChange(index, key, value) {
    console.log('onParamChange', index, key, value);
  }

  render() {
    const panels = this.state.modules.map((module, index) => {
      return (
        <StyledPanel
          key={index}
          index={index}
          module={module}
          onChange={(key, value) => this.onParamChange(index, key, value)}
        />
      )
    });

    return (
      <Root>
        {panels}
      </Root>
    );
  }
}