import React from 'react';
import styled from 'styled-components';
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'

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

  onChange(control, value) {
    const { onChange } = this.props;
    const { id } = control;

    if (onChange) onChange(id, value);
  }

  controlToComponent(control, param) {
    switch (control.type) {
      case 'range':
        return <StyledRange
          config={control}
          value={param}
          onChange={value => this.onChange(control, value)}
        />;
      case 'menu':
        return <StyledMenu
          config={control}
          value={param}
          onSelect={(choice, index) => this.onChange(control, choice.key)}
        />;
      case 'switch':
        return <StyledSwitch
          config={control}
          value={param}
          onToggle={selected => this.onChange(control, selected)}
        />;
    }
  }

  render() {
    const { index, module } = this.props;
    const { params = {}, config } = module;

    const controls = config.controls.map((control, index) => {
      const param = params[control.id];
      const component = this.controlToComponent(control, param);

      return (
        <ControlWrapper key={index}>
          <ControlName>{control.name}</ControlName>
          {component}
        </ControlWrapper>
      );
    });

    return (
      <Root className={this.props.className}>
        <ModuleName>{index}<br />{config.name}</ModuleName>
        {controls}
      </Root>
    );
  }
}