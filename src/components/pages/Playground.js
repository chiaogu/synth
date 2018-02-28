import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'
import Range from '@components/dumbs/Range'

const StyledRange = styled(Range) `
  height: 200px;
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: auto;
`

const StyledPanel = styled(Panel) `
  margin: 8px;
`

class Playground extends React.Component {
  componentDidMount() {
    const { loadModules } = this.props
    loadModules()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modules = this.props.modules
    const nextModules = nextProps.modules
    return modules.length !== nextModules.length
  }

  render() {
    const {
      modules,
      loadModules,
      test,
      set
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
        <StyledRange
          config={{
            type: 'range',
            name: 'frequency',
            id: 'frequency.value',
            min: 0,
            max: 440
          }}
          value={220}
          onChange={value => set(0, 'frequency.value', value)}
        />
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
      loadModulesSuccess,
      setParameter
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
            modules[0].params['volume.value'] = 0
            modules[0].params['start'] = false
            modules[0].params['type'] = 'sine'
            loadModulesSuccess(modules)
          })
      },
      set(index, name, value) {
        setParameter(index, name, value)
      }
    }
  }
)(Playground)