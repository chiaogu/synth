import * as _local from './local'
import * as _remote from './remote'

export const local = _local
export const remote = _remote

import { connect } from 'react-redux'
export default connect(
  ({ modules, preset }) => ({
    modules: modules.modules,
    preset: preset.preset
  }),
  undefined
)(({ modules, preset }) => {
  if (preset) {
    let currentPreset = {
      ...preset,
      modules: modules.map(module => ({
        id: module.config.id,
        params: module.params
      }))
    }
    local.saveCurrentPreset(currentPreset)
  }
  return null
})