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

const StyledPanel = styled(Panel) `
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
        try {
          Core.setModules(modules);
        } catch (e) {
          alert(e.message);
        }
        this.setState({ modules });
      });
  }

  onParamChange(index, key, value) {
    Core.set(index, key, value);
  }

  onCallFunction(index, name) {
    Core.call(index, name);
  }

  render() {
    const panels = this.state.modules.map((module, index) => {
      return (
        <StyledPanel
          key={index}
          index={index}
          module={module}
          onChange={(key, value) => this.onParamChange(index, key, value)}
          onCall={functionName => this.onCallFunction(index, functionName)}
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