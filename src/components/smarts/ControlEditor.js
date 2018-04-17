import React from 'react'
import styled from 'styled-components'
import ButtonEditor from '@components/smarts/ButtonEditor'
import _ from '@utils/lodash'

const Root = styled.div`
  width: 480px;
  max-width: calc(100vw - 32px);
  height: 100%;
  margin: 0 auto;
`
class ControlEditor extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { control, finishCaptureMode } = this.props
    const isControlChanged = !_.isEqual(nextProps.control, control)
    if (isControlChanged) {
      finishCaptureMode()
    }
  }

  getEditorComponent(control, panelIndex, controlIndex) {
    switch (control.type) {
      case 'switch':
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
import { finishCaptureMode } from '@flow/controlEditor/actions'

export default connect(
  ({ preset: {
    preset: { panels },
    currentEditingControl: { panelIndex, controlIndex }
  } }) => {
    return {
      control: panelIndex !== undefined
        && controlIndex !== undefined
        && {...panels[panelIndex].controls[controlIndex]},
      controlIndex,
      panelIndex
    }
  },
  dispatch => ({
    updateCustomPanelControl(control, index) {
      dispatch(updateCustomPanelControl(control, index))
    },
    finishCaptureMode() {
      dispatch(finishCaptureMode())
    }
  })
)(ControlEditor)