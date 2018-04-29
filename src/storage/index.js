import * as _local from './local'

export const local = _local

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
    local.set('currentPreset', currentPreset)
  }
  return null
})