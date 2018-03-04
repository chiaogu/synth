import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'
import ModuleFinder from '@components/smarts/ModuleFinder'
import DndList from '@components/dumbs/DndList'

const EDIT_MODE_TRANSITION = 500

const Root = styled.div`
  display: flex;
  position: relative;
`

const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: auto;
`

const ModuleSpace = styled.div `
  transition: width ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
    width: 480px;
  ` : `
    width: 0;
  `}
`

const StyledModuleFinder = styled(ModuleFinder)`
  width: 200px;
  height: 100%;
  position: absolute;
  background: black;
  transition: left ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
    left: 0;
  ` : `
    left: -200px;
  `}
`

const StyledPanel = styled(Panel) `
  height: 100%;
  width: 100%;
`

const Module = styled.div`
  margin: 8px;
  max-width: calc(100%-16px);
  position: relative;
  flex-shrink: 0;
  background: white;
  transition: all ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
    width: 100px;
    height: 100px;
  ` : `
    width: 480px;
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
  background: white;
  color: black;
  text-align: center;
  pointer-events: none;
  overflow: hidden;
  transition: height ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
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
    if (presetChanged)
      this.loadModules(nextProps)

    const isEditing = nextProps.isEditing
    if (isEditing)
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

    return (
      <Root className={this.props.className}>
        <ModuleSpace isEditing={isEditing} >
          <StyledModuleFinder isEditing={isEditing} />
        </ModuleSpace>
        <ModuleList>
          <button onClick={e => setEditMode(!isEditing)}>
            {preset.id}{preset.name}
          </button>
          <DndList
            droppableId="PRESET"
            data={modules}
            isDragDisable={() => !isEditing}
            onBindView={(module, index) => (
              <Module key={index} isEditing={isEditing}>
                <ModuleName isEditing={isPanelEditing}>
                  {module.config.name}
                </ModuleName>
                {isPanelEditing ? null :(
                  <StyledPanel index={index} module={module} />
                )}
              </Module>
            )}>
          </DndList>
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
        if (isEditing)
          startEditPreset()
        else
          finishEditPreset()
      }
    }
  }
)(Preset)