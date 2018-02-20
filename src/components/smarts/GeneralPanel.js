import React from 'react';
import styled from 'styled-components';
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Config from '@utils/Config';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 8px;
  background: #fff;
`;

const ModuleName = styled.div`
  margin-right: 16px;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const ControlName = styled.div`
  margin-bottom: 8px;
`;

const StyledMenu = styled(Menu) `
  height: 200px;
`;

const StyledRange = styled(Range) `
  height: 200px;
`;

const StyledSwitch = styled(Switch) `
  width: 30px;
  height: 30px;
`;

export default class GeneralPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange(name, value) {
    console.log('onChange', name, value);
  }

  controlToComponent(index, control, param) {
    switch (control.type) {
      case 'range':
        return <StyledRange
          config={control}
          value={param}
          onChange={value => this.onChange(control.name, value)}
        />;
      case 'menu':
        return <StyledMenu
          config={control}
          value={param}
          onSelect={(choice, index) => this.onChange(control.name, choice.key)}
        />;
      case 'switch':
        return <StyledSwitch
          config={control}
          value={param}
          onToggle={selected => this.onChange(control.name, selected)}
        />;
    }
  }

  render() {
    const { id, module } = this.props;
    const params = module.params || {};

    const controls = Config.getControls(module.type).map((control, index) => {
      const param = params[control.id];
      const component = this.controlToComponent(index, control, param);

      return (
        <ControlWrapper key={index}>
          <ControlName>{control.name}</ControlName>
          {component}
        </ControlWrapper>
      );
    });

    return (
      <Root className={this.props.className}>
        <ModuleName>{id}<br />{module.type}</ModuleName>
        {controls}
      </Root>
    );
  }
}