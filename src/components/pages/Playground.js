import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledPanel = styled(Panel) `
  margin: 8px;
`

class Playground extends React.Component {
  componentDidMount() {
    const { loadModules } = this.props
    loadModules()
  }

  render() {
    const {
      modules,
      loadModules,
      test
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
        <button onClick={loadModules}>load</button>
        <button onClick={test}>change</button>
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
      loadModules() {
        const preset = Config.getPreset()
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
      },
      test() {
        const preset = Config.getPreset()
        loadModules(preset.id)
        const ids = preset.modules.map(module => module.id)
        Config.getModules(ids)
          .then(modules => modules.map((module, index) => ({
            params: preset.modules[index].params,
            config: module
          })))
          .then(modules => {
            modules[0].params['volume.value'] = 0;
            loadModulesSuccess(modules)
          })
      }
    }
  }
)(Playground)