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
    this.loadPreset('0')
  }

  loadPreset(id) {
    const { loadPreset } = this.props
    loadPreset(id)
  }

  getPresetComponent(preset) {
    return !!preset ? <StyledPreset/> : undefined
  }

  getPresetSlots() {
    return ['0', '1'].map((id, index) => (
      <PresetSlot key={index} onClick={e => this.loadPreset(id)} >
        {id}
      </PresetSlot>
    ))
  }

  render() {
    const { preset, loadPreset } = this.props

    return (
      <Root>
        <TopBar>
          {this.getPresetSlots()}
        </TopBar>
        {this.getPresetComponent(preset)}
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PresetActions from '@state/preset/actions'
import * as Config from '@utils/Config'

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
        loadPreset(id)
        Config.getPreset(id).then(preset => {
          loadPresetSuccess(preset)
        })
      }
    }
  }
)(Playground)