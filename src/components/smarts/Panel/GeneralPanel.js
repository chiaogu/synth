import React from 'react'
import styled from 'styled-components'
import _ from '@utils/lodash'
import Slider from '@components/dumbs/Slider'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Button from '@components/dumbs/Button'
import { connect, setControlAction } from './PanelLogic'

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  overflow: auto;
  box-sizing: border-box;
`

const ModuleName = styled.div`
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-contens: center;
  font-size: 18px;
`

const ControlListPadding = styled.div`
  width: 16px;
  flex-shrink: 0;
`

const ControlList = styled.div`
  max-width: 100%;
  padding: 8px 0 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  overflow-x: auto;
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
`

const ControlName = styled.div`
  height: 24px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

const StyledMenu = styled(Menu) `
  height: 100%;
`

const StyledSlider = styled(Slider) `
  width: 36px;
  height: 100%;
`

const StyledSwitch = styled(Switch) `
  width: 36px;
  height: 36px;
`

const StyledButton = styled(Button) `
  width: 36px;
  height: 36px;
`

class GeneralPanel extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const module = this.props.modules[this.props.index]
    const nextModule = nextProps.modules[nextProps.index]
    return this.props.isCapturing !== nextProps.isCapturing
      || !_.isEqual(module.params, nextModule.params)
      || !_.isEqual(module.config, nextModule.config)
  }

  onChange(control, value) {
    const { index, setParameter, isCapturing } = this.props
    const { id } = control

    if (isCapturing) {
      setControlAction(control, value, this.props)
    }

    setParameter(index, id, value);
  }

  controlToComponent(control, param) {
    switch (control.type) {
      case 'slider':
        return <StyledSlider
          config={control}
          value={param}
          onChange={value => this.onChange(control, value)}
        />
      case 'menu':
        return <StyledMenu
          config={control}
          value={param}
          onSelect={(choice, index) => {
            const value = choice.value !== undefined ? choice.value : choice.key
            this.onChange(control, value)
          }}
        />
      case 'switch':
        return <StyledSwitch
          config={control}
          value={param}
          onToggle={selected => this.onChange(control, selected)}
        />
      case 'button':
        return <StyledButton
          config={control}
          value={param}
          onToggle={pressed => this.onChange(control, pressed)}
        />
    }
  }

  render() {
    const { index, modules } = this.props
    const { params = {}, config: { controls = [], name } } = modules[index]

    const components = controls.map((control, index) => {
      const param = params[control.id] === undefined ? control.defaultValue : params[control.id]
      const component = this.controlToComponent(control, param)

      return (
        <ControlWrapper key={index}>
          {component}
          <ControlName>{control.name}</ControlName>
        </ControlWrapper>
      )
    })

    return (
      <Root className={this.props.className}>
        <ModuleName>{name}</ModuleName>
        <ControlList>
          <ControlListPadding />
          {components}
          <ControlListPadding />
        </ControlList>
      </Root>
    )
  }
}

export default connect(GeneralPanel)