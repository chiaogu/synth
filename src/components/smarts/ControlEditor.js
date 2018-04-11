import React from 'react'
import styled from 'styled-components'

class ControlEditor extends React.Component {
  render() {
    const { control } = this.props
    if (!control) {
      return null
    }

    return (
      <h1 style={{ color: 'white' }}> {control.type} </h1>
    )
  }
}


import { connect } from 'react-redux'
import { updateCustomPanelControl } from '@flow/preset/actions'

export default connect(
  ({ preset: {
    preset: { panels },
    currentEditingControl: { panelIndex, controlIndex }
  } }) => {
    return {
      control: panelIndex !== undefined
        && controlIndex !== undefined
        && panels[panelIndex].controls[controlIndex],
      controlIndex,
      panelIndex
    }
  },
  dispatch => ({
    updateCustomPanelControl(control, index) {
      dispatch(updateCustomPanelControl(control, index))
    }
  })
)(ControlEditor)