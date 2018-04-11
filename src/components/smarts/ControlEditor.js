import React from 'react'
import styled from 'styled-components'
import Slider from '@components/dumbs/Slider'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Button from '@components/dumbs/Button'

const SHINE = '0px 2px 15px 0px rgba(255,255,255,1)'

const Root = styled.div`
  display: flex;
  width: 480px;
  max-width: calc(100vw - 32px);
  height: 100%;
  margin: 0 auto;
  padding: 16px 0;
`

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`

const StyledMenu = styled(Menu) `
  height: 100%;
`

const StyledSlider = styled(Slider) `
  width: 36px;
  height: 200px;
  box-shadow: ${SHINE};
`

const StyledSwitch = styled(Switch) `
  width: 36px;
  height: 36px;
  box-shadow: ${SHINE};
`

const StyledButton = styled(Button) `
  width: 36px;
  height: 36px;
  box-shadow: ${SHINE};
`

const AttrList = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const AttrName = styled.div`
  color: #fff;
`

class ControlEditor extends React.Component {

  onChange(control, value) {
    console.log('onChange', value)
  }

  controlToComponent(control) {
    switch (control.type) {
      case 'button':
        return <StyledButton
          onToggle={pressed => this.onChange(control, pressed)} />

      case 'switch':
        return <StyledSwitch
          onToggle={selected => this.onChange(control, selected)} />

      case 'slider':
        return <StyledSlider
          config={control.config}
          onChange={value => this.onChange(control, value)} />
    }
  }
  render() {
    const { control } = this.props
    if (!control) {
      return null
    }

    return (
      <Root>
        <ControlWrapper>
          {this.controlToComponent(control)}
        </ControlWrapper>
        <AttrList>
          {['abc', 'defgh', 'ijk', 'lmnop', 'qrst'].map((item, index) => (
            <AttrName key={index}>{item}</AttrName>
          ))}
        </AttrList>
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { updateCustomPanelControl } from '@flow/preset/actions'

export default connect(
  ({ preset: {
    preset: { panels },
    currentEditingControl: { panelIndex, controlIndex }
  } }) => ({
    control: panelIndex !== undefined
      && controlIndex !== undefined
      && panels[panelIndex].controls[controlIndex],
    controlIndex,
    panelIndex
  }),
  dispatch => ({
    updateCustomPanelControl(control, index) {
      dispatch(updateCustomPanelControl(control, index))
    }
  })
)(ControlEditor)