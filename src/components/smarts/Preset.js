import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'
import ModuleFinder from '@components/smarts/ModuleFinder'

const EDIT_MODE_TRANSITION = 600

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
  transition: width ${EDIT_MODE_TRANSITION / 1000}s;
  ${({isEditing}) => isEditing ? `
    width: 100%;
  ` : `
    width: 100%;
  `}
`

const StyledModuleFinder = styled(ModuleFinder)`
  background: white;
  transition: width ${EDIT_MODE_TRANSITION / 1000}s;
  ${({isEditing}) => isEditing ? `
    width: 480px;
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
  max-width: 720px;
  position: relative;
  flex-shrink: 0;
  background: white;
  transition: width ${EDIT_MODE_TRANSITION / 1000}s, height ${EDIT_MODE_TRANSITION / 1000}s;
  ${({isEditing}) => isEditing ? `
    width: 200px;
    height: 100px;
  ` : `
    width: calc(100% - 16px);
    height: 250px;
  `}
`

const ModuleName = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
  text-align: center;
  pointer-events: none;
  overflow: hidden;
  transition: height ${EDIT_MODE_TRANSITION / 1000}s;
  ${({isEditing}) => isEditing ? `
    height: 100%;
  ` : `
    height: 0;
  `}
`

class Preset extends React.Component {
  componentDidMount() {
    this.loadModules(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modulesChanged = this.props.modules.length !== nextProps.modules.length
    const isEditedChanged = this.props.isEditing !== nextProps.isEditing
    const isPanelEditing = this.state.isPanelEditing !== nextState.isPanelEditing
    return modulesChanged || isEditedChanged || isPanelEditing
  }

  componentWillReceiveProps(nextProps) {
    const presetChanged = this.props.preset.id !== nextProps.preset.id
    if(presetChanged)
      this.loadModules(nextProps)

    const isEditing = nextProps.isEditing
    if(isEditing)
      this.setState({ isPanelEditing: true })
    else
      setTimeout(() => this.setState({ isPanelEditing: false }), EDIT_MODE_TRANSITION)
  }

  loadModules(props) {
    const { loadModules, preset } = props
    loadModules(preset)
  }

  constructor(props) {
    super(props)

    this.state = { isPanelEditing: false }
  }

  render() {
    const {
      isEditing,
      preset = {},
      modules,
      loadPreset,
      loadModules,
      setEditMode
    } = this.props
    const {
      isPanelEditing
    } = this.state

    const panels = modules.map((module, index) => {
      const panel = isPanelEditing ? undefined :
        <StyledPanel
          index={index}
          module={module}/>

      return (
        <Module
          key={index}
          isEditing={isEditing}>
          <ModuleName isEditing={isPanelEditing}>
            {module.config.name}
          </ModuleName>
          {panel}
        </Module>
      )
    })

    return (
      <Root className={this.props.className}>
        <StyledModuleFinder isEditing={isEditing}/>
        <ModuleList isEditing={isEditing}>
          <button onClick={e => setEditMode(!isEditing)}>
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
import * as PresetActions from '@state/preset/actions'
import * as Config from '@utils/Config'

export default connect(
  state => ({
    preset: state.preset.preset,
    isEditing: state.preset.isEditing,
    modules: state.modules.modules
  }),
  dispatch => {
    const {
      loadModules,
      loadModulesSuccess
    } = bindActionCreators(ModulesActions, dispatch)
    const {
      startEditPreset,
      finishEditPreset
    } = bindActionCreators(PresetActions, dispatch)

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
      },
      setEditMode(isEditing) {
        if(isEditing)
          startEditPreset()
        else
          finishEditPreset()
      }
    }
  }
)(Preset)