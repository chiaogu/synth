import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
`

const StyledPanel = styled(Panel) `
  margin: 8px;
`

class Preset extends React.Component {
  componentDidMount() {
    this.loadModules(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modulesChanged = this.props.modules.length !== nextProps.modules.length
    return modulesChanged
  }

  componentWillReceiveProps(nextProps) {
    const presetChanged = this.props.preset.id !== nextProps.preset.id
    if(!presetChanged) return
    this.loadModules(nextProps)
  }

  loadModules(props) {
    const { loadModules, preset } = props
    loadModules(preset)
  }

  render() {
    const {
      preset = {},
      modules,
      loadPreset,
      loadModules
    } = this.props

    const panels = modules.map((module, index) => {
      return (
        <StyledPanel
          key={index}
          index={index}
          module={module}
        />
      )
    })

    return (
      <Root>
        {preset.id}{preset.name}
        {panels}
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModulesActions from '@state/modules/actions'
import * as Config from '@utils/Config'

export default connect(
  state => ({
    modules: state.modules.modules
  }),
  dispatch => {
    const {
      loadModules,
      loadModulesSuccess
    } = bindActionCreators(ModulesActions, dispatch)

    return {
      loadModules(preset) {
        loadModules(preset.id)
        const ids = preset.modules.map(module => module.id)
        Config.getModules(ids)
          .then(modules => modules.map((module, index) => ({
            params: preset.modules[index].params,
            config: module
          })))
          .then(modules => {
            loadModulesSuccess(modules)
          })
      }
    }
  }
)(Preset)