import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  position: relative;
`

const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
  transition: width .5s;
  ${({isEditing}) => isEditing ? `
    width: 30%;
  ` : `
    width: 100%;
  `}
`

const ModuleFinder = styled.div`
  background: black;
  transition: width .5s;
  ${({isEditing}) => isEditing ? `
    width: 70%;
  ` : `
    width: 0;
  `}
`

const StyledPanel = styled(Panel) `
  height: 100%;
  width: 100%;
`

const Module = styled.div`
  margin: 8px;
  flex-shrink: 0;
  background: white;
  transition: width .5s, height .5s;
  ${({isEditing}) => isEditing ? `
    width: 100px;
    height: 100px;
  ` : `
    width: calc(100% - 16px);
    height: 250px;
  `}
`

class Preset extends React.Component {
  componentDidMount() {
    this.loadModules(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modulesChanged = this.props.modules.length !== nextProps.modules.length
    const isEditedChanged = this.state.edited !== nextState.edited
    return modulesChanged || isEditedChanged
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

  constructor(props) {
    super(props)
    this.state = { edited: false }
  }

  render() {
    const {
      preset = {},
      modules,
      loadPreset,
      loadModules
    } = this.props
    const isEditing = this.state.edited;

    const panels = modules.map((module, index) => {
      let panel = isEditing ? undefined :
        <StyledPanel
          index={index}
          module={module}/>

      return (
        <Module
          key={index}
          isEditing={isEditing}
          >
          {panel}
        </Module>
      )
    })

    return (
      <Root className={this.props.className}>
        <ModuleFinder isEditing={isEditing}/>
        <ModuleList isEditing={isEditing}>
          <button onClick={e => this.setState({edited: !isEditing})}>
            {preset.id}{preset.name}
          </button>
          {panels}
        </ModuleList>
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