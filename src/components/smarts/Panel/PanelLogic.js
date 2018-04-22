import { connect as connectState } from 'react-redux'
import { setParameter } from '@flow/modules/actions'
import { updateCustomPanelControl } from '@flow/preset/actions'

export function setControlAction(selectedControl, value, props) {
  const { id } = selectedControl
  const {
    index: moduleIndex,
    editingControl: {
      panelIndex,
      controlIndex,
      control
    },
    capturingAction: {
      actionIndex,
      value: actionValue
    },
    updateCustomPanelControl
  } = props

  const action = control.actions[actionIndex]

  switch (control.type) {
    case 'switch':
    case 'button': {
      if (action.id !== id || action.index !== moduleIndex) {
        control.actions[actionIndex] = {
          id,
          index: moduleIndex,
          params: {
            [`${actionValue}`]: value,
            [`${!actionValue}`]: undefined
          }
        }
      } else {
        control.actions[actionIndex].params[`${actionValue}`] = value
      }
      break
    }
    case 'slider': {
      const { type, max, min, defaultValue } = selectedControl
      if (type === 'slider') {
        control.config = {
          max, min, defaultValue
        }
        control.actions[actionIndex] = {
          id,
          index: moduleIndex
        }
      }
      break
    }
  }

  updateCustomPanelControl(control, controlIndex)
}

export function connect(Component) {
  return connectState(
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
  )(Component)
}