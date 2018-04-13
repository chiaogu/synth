import React from 'react'
import styled from 'styled-components'
import ButtonEditor from '@components/smarts/ButtonEditor'

const Root = styled.div`
  width: 480px;
  max-width: calc(100vw - 32px);
  height: 100%;
  margin: 0 auto;
`
class ControlEditor extends React.Component {
  getEditorComponent(control, panelIndex, controlIndex) {
    switch (control.type) {
      case 'button':
        return (
          <ButtonEditor
            control={control}
            controlIndex={controlIndex}
            panelIndex={panelIndex}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { control, panelIndex, controlIndex } = this.props
    if (!control) {
      return null
    }

    return (
      <Root>
        {this.getEditorComponent(control, panelIndex, controlIndex)}
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