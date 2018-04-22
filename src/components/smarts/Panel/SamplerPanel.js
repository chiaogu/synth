import React from 'react'
import styled from 'styled-components'
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

const PITCHS = [
  { key: 'C2' }, { key: 'D2' }, { key: 'E2' }, { key: 'F2' }, { key: 'G2' }, { key: 'A2' }, { key: 'B2' },
  { key: 'C3' }, { key: 'D3' }, { key: 'E3' }, { key: 'F3' }, { key: 'G3' }, { key: 'A3' }, { key: 'B3' },
  { key: 'C4' }, { key: 'D4' }, { key: 'E4' }, { key: 'F4' }, { key: 'G4' }, { key: 'A4' }, { key: 'B4' }
]

class SamplerPanel extends React.Component {

  onChange(id, value) {
    const { index, isCapturing } = this.props
    if (isCapturing) {
      setControlAction({ id }, value, this.props)
    }
    this.setParameter(id, value)
  }

  setParameter(id, value, params) {
    const { index, setParameter } = this.props
    setParameter(index, id, value, params)
  }

  onRecord(pressed) {
    this.onChange('record', pressed)
  }

  onTrigger(pressed) {
    this.onChange('trigger', pressed)
  }

  setPitch(note) {
    this.onChange('pitch', note)
  }

  render() {
    const { index, modules } = this.props
    const { params: {
      pitch = 'C3',
      trigger,
      record
     } = {}, config: { controls = [], name } } = modules[index]

    return (
      <Root className={this.props.className}>
        <ModuleName>{name}</ModuleName>
        <ControlList>
          <ControlListPadding />
          <ControlWrapper>
            <StyledSwitch
              value={record}
              onToggle={pressed => this.onRecord(pressed)} />
            <ControlName>record</ControlName>
          </ControlWrapper>
          <ControlWrapper>
            <StyledMenu
              value={pitch}
              config={{ choices: PITCHS }}
              onSelect={choice => this.setPitch(choice.key)} />
            <ControlName>pitch</ControlName>
          </ControlWrapper>
          <ControlWrapper>
            <StyledSwitch
              value={trigger}
              onToggle={pressed => this.onTrigger(pressed)} />
            <ControlName>trigger</ControlName>
          </ControlWrapper>
          <ControlListPadding />
        </ControlList>
      </Root>
    )
  }
}

export default connect(SamplerPanel)