import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'
import _ from '@utils/lodash'
import Panel from '@components/smarts/Panel'
import ModuleFinder from '@components/smarts/ModuleFinder'
import DndList from '@components/dumbs/DndList'
import { ID } from '@components/smarts/DragDropHandler'

const EDIT_MODE_TRANSITION = 600

const Root = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  transition: width ${EDIT_MODE_TRANSITION / 1000}s;
`

const ModuleList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
  padding-top: 66px;
`

const ModuleFinderSpace = styled.div `
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  transition: width ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
    width: 480px;
    @media screen and (max-width: 960px) {
      width: 67%;
    }
  ` : `
    width: 0;
  `}
`

const StyledModuleFinder = styled(ModuleFinder)`
  width: 100%;
  height: 100%;
  background: black;
`

const ModuleFinderToggle = styled.div`
  position: absolute;
  z-index: 2;
  width: 48px;
  height: 48px;
  margin: 16px 0 0 16px;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  cursor: pointer;
`

const StyledPanel = styled(Panel) `
  height: 100%;
  width: 100%;
`

const Module = styled.div`
  max-width: calc(100vw - 32px);
  position: relative;
  flex-shrink: 0;
  background: white;
  transition: all ${EDIT_MODE_TRANSITION / 1000}s;
  ${({ isEditing }) => isEditing ? `
    width: 96px;
    height: 96px;
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
    const modulesChanged = !_.isEqual(this.props.modules, nextProps.modules)
    const isEditedChanged = this.props.isEditing !== nextProps.isEditing
    const isPanelEditingChanged = this.state.isPanelEditing !== nextState.isPanelEditing
    const isModuleFinderShownChanged = this.state.isModuleFinderShown !== nextState.isModuleFinderShown
    return modulesChanged || isEditedChanged || isPanelEditingChanged || isModuleFinderShownChanged
  }

  componentWillReceiveProps(nextProps) {
    const presetChanged = this.props.preset.id !== nextProps.preset.id
    if (presetChanged)
      this.loadModules(nextProps)

    const isEditing = nextProps.isEditing
    if (isEditing){
      this.setState({ isPanelEditing: true })
      setTimeout(() => this.setState({ isModuleFinderShown: true }), EDIT_MODE_TRANSITION)
    }else{
      this.setState({ isModuleFinderShown: false })
      setTimeout(() => this.setState({ isPanelEditing: false }), EDIT_MODE_TRANSITION)
    }
  }

  loadModules(props) {
    const { loadModules, preset } = props
    loadModules(preset)
  }

  constructor(props) {
    super(props)

    this.state = {
      isPanelEditing: false,
      isModuleFinderShown: false
    }
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
      isPanelEditing,
      isModuleFinderShown
    } = this.state

    return (
      <Root className={this.props.className} isEditing={isEditing}>
        <ModuleFinderSpace isEditing={isEditing} >
          {!isModuleFinderShown ? null : (
            <StyledModuleFinder/>
          )}
        </ModuleFinderSpace>

        <ModuleFinderToggle
          isEditing={isEditing}
          onClick={e => setEditMode(!isEditing)}
        >X</ModuleFinderToggle>
        <ModuleList>
          <DndList
            droppableId={ID.PRESET}
            gap={'8px'}
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