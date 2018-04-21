
import { connect } from 'react-redux'
import {
  updateCustomPanelControl,
  removeCustomPanelControl
} from '@flow/preset/actions'
import { setParameter } from '@flow/modules/actions'
import {
  startCaptureMode,
  finishCaptureMode
} from '@flow/controlEditor/actions'
import { finishEditControl } from '@flow/preset/actions'

export default Component => connect(
  ({
    controlEditor: {
      isCapturing,
      actionIndex,
      value
    },
    preset: {
      currentEditingControl: {
        controlIndex
      }
    }
  }) => ({
    isCapturing,
    actionIndex,
    value,
    controlIndex
  }),
  dispatch => {
    return {
      performAction(control, pressed) {
        const { actions } = control
        actions.forEach(({ index, id, params }) => {
          let value = pressed
          if (params === undefined) {
            dispatch(setParameter(index, id, value))
          } else {
            value = params[value]
            if (value !== undefined) {
              dispatch(setParameter(index, id, value))
            }
          }
        });
      },
      clickActionItem(currIndex, currValue, index, value) {
        if (currIndex === index && currValue === value) {
          dispatch(finishCaptureMode())
        } else {
          dispatch(startCaptureMode(index, value))
        }
      },
      addAction(control, controlIndex, action) {
        control.actions.push(action)
        dispatch(updateCustomPanelControl(control, controlIndex))
      },
      deleteAction(control, actionIndex, controlIndex) {
        control.actions.splice(actionIndex, 1)
        dispatch(updateCustomPanelControl(control, controlIndex))
      },
      deleteControl(controlIndex) {
        dispatch(removeCustomPanelControl(controlIndex))
        dispatch(finishEditControl())
      }
    }
  }
)(Component)