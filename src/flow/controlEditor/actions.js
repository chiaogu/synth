import createConstants from '@utils/createConstants'

export const TYPES = createConstants('CONTROL_EDITOR', [
  'START_CAPTURE_MODE',
  'FINISH_CAPTURE_MODE'
])

export const startCaptureMode = (actionIndex, value) => ({
  type: TYPES.START_CAPTURE_MODE,
  actionIndex,
  value
})

export const finishCaptureMode = () => ({
  type: TYPES.FINISH_CAPTURE_MODE
})