
import { connect } from 'react-redux'
import { updateCustomPanelControl } from '@flow/preset/actions'
import { setParameter } from '@flow/modules/actions'
import {
  startCaptureMode,
  finishCaptureMode
} from '@flow/controlEditor/actions'

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
      addAction(control, controlIndex) {
        control.actions.push({
          index: undefined,
          id: undefined,
          params: {
            'true': undefined,
            'false': undefined
          }
        })
        dispatch(updateCustomPanelControl(control, controlIndex))
      },
      deleteAction(control, actionIndex, controlIndex) {
        control.actions.splice(actionIndex, 1)
        dispatch(updateCustomPanelControl(control, controlIndex))
      }
    }
  }
)(Component)