import React from 'react'
import styled from 'styled-components'
import Preset from '@components/pages/Preset'

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
`

const TopBar = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  display: flex;
  flex: 0 0 auto;
`

const PresetSlot = styled.button`
  width: 50px;
  height: 50px;
`

const StyledPreset = styled(Preset) `
  flex: 1 1 auto;
`

class Playground extends React.Component {
  componentDidMount() {
    const { loadPreset } = this.props
    loadPreset()
  }

  render() {
    const { preset } = this.props
    return (
      <Root>
        {preset && <StyledPreset />}
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PresetActions from '@flow/preset/actions'
import * as Config from '@utils/config'
import * as Storage from '@storage'

export default connect(
  state => ({
    preset: state.preset.preset
  }),
  dispatch => {
    const {
      loadPreset,
      loadPresetSuccess
    } = bindActionCreators(PresetActions, dispatch)

    return {
      loadPreset(id) {
        loadPreset()
        // Config.getPreset(id).then(preset => {
        //   loadPresetSuccess(preset)
        // })
        let currentPreset = Storage.local.get('currentPreset')
        console.log('storage', currentPreset)
        currentPreset = currentPreset || {
          modules: [],
          panels: []
        }
        loadPresetSuccess(currentPreset)
      }
    }
  }
)(Playground)