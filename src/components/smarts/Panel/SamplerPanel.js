import React from 'react'
import styled from 'styled-components'
import _ from '@utils/lodash'
import * as AudioUtils from '@utils/audioUtils'
import Slider from '@components/dumbs/Slider'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Button from '@components/dumbs/Button'

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

class SamplerPanel extends React.Component {
  // setControlAction(selectedControl, value) {
  //   const { id } = selectedControl
  //   const {
  //     index: moduleIndex,
  //     editingControl: {
  //       panelIndex,
  //       controlIndex,
  //       control
  //     },
  //     capturingAction: {
  //       actionIndex,
  //       value: actionValue
  //     },
  //     updateCustomPanelControl
  //   } = this.props

  //   const action = control.actions[actionIndex]

  //   switch (control.type) {
  //     case 'switch':
  //     case 'button': {
  //       if (action.id !== id || action.index !== moduleIndex) {
  //         control.actions[actionIndex] = {
  //           id,
  //           index: moduleIndex,
  //           params: {
  //             [`${actionValue}`]: value,
  //             [`${!actionValue}`]: undefined
  //           }
  //         }
  //       } else {
  //         control.actions[actionIndex].params[`${actionValue}`] = value
  //       }
  //       break
  //     }
  //     case 'slider': {
  //       const { type, max, min, defaultValue } = selectedControl
  //       if (type === 'slider') {
  //         control.config = {
  //           max, min, defaultValue
  //         }
  //         control.actions[actionIndex] = {
  //           id,
  //           index: moduleIndex
  //         }
  //       }
  //       break
  //     }
  //   }

  //   updateCustomPanelControl(control, controlIndex)
  // }

  // controlToComponent(control, param) {
  //   switch (control.type) {
  //     case 'slider':
  //       return <StyledSlider
  //         config={control}
  //         value={param}
  //         onChange={value => this.onChange(control, value)}
  //       />
  //     case 'menu':
  //       return <StyledMenu
  //         config={control}
  //         value={param}
  //         onSelect={(choice, index) => {
  //           const value = choice.value !== undefined ? choice.value : choice.key
  //           this.onChange(control, value)
  //         }}
  //       />
  //     case 'switch':
  //       return <StyledSwitch
  //         config={control}
  //         value={param}
  //         onToggle={selected => this.onChange(control, selected)}
  //       />
  //     case 'button':
  //       return <StyledButton
  //         config={control}
  //         value={param}
  //         onToggle={pressed => this.onChange(control, pressed)}
  //       />
  //   }
  // }

  constructor() {
    super()
    this.recorder = null
  }

  setParameter(id, value, params) {
    const { index, setParameter } = this.props
    setParameter(index, id, value, params)
  }

  onRecord(pressed) {
    this.setParameter('record', pressed)
    if (pressed) {
      this.recorder = AudioUtils.record()
      this.recorder.result.then(buffer => {
        this.setParameter('buffer', true, ['C3', buffer])
      })
    } else {
      if (this.recorder) {
        this.recorder.stop()
        this.recorder = null
      }
    }
  }

  onTrigger(note, pressed) {
    this.setParameter('trigger', pressed, [note])
  }

  render() {
    const { index, modules } = this.props
    const { params = {}, config: { controls = [], name } } = modules[index]

    return (
      <Root className={this.props.className}>
        <ModuleName>{name}</ModuleName>
        <ControlList>
          <ControlListPadding />
          <ControlWrapper>
            <StyledButton onToggle={pressed => this.onRecord(pressed)} />
            <ControlName>record</ControlName>
          </ControlWrapper>
          {['G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3'].map((note ,index) => (
            <ControlWrapper key={index}>
              <StyledButton onToggle={pressed => this.onTrigger(note, pressed)} />
              <ControlName>{note}</ControlName>
            </ControlWrapper>
          ))}
          <ControlListPadding />
        </ControlList>
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { setParameter } from '@flow/modules/actions'
import { updateCustomPanelControl } from '@flow/preset/actions'

export default connect(
  ({ modules, controlEditor, preset }) => ({
    modules: modules.modules,
    editingControl: preset.currentEditingControl,
    isCapturing: controlEditor.isCapturing,
    capturingAction: {
      actionIndex: controlEditor.actionIndex,
      value: controlEditor.value
    }
  }),
  dispatch => ({
    setParameter(moduleIndex, controlName, value, params) {
      dispatch(setParameter(moduleIndex, controlName, value, params))
    },
    updateCustomPanelControl(control, index) {
      dispatch(updateCustomPanelControl(control, index))
    }
  })
)(SamplerPanel)