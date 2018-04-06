import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'
import _ from '@utils/lodash'
import Panel from '@components/smarts/Panel'
import ModuleFinder from '@components/smarts/ModuleFinder'
import DndList from '@components/dumbs/DndList'
import { ID } from '@components/smarts/DragDropHandler'
import CustomPanel from '@components/smarts/CustomPanel'

const EDIT_MODE_TRANSITION = 600
const TRANSITION_TIMEING_FUNC_IN = 'cubic-bezier(0.86, 0, 0.07, 1)';

const Root = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`

const ModuleList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
  padding-bottom: 8px;
  transition: padding ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
  ${({ isEditingPanel }) => isEditingPanel ? `
    padding-top: 16px;
  ` : `
    padding-top: 68px;
  `}
  ${({ isTrashCanVisible }) => isTrashCanVisible ? `` : `
    -webkit-overflow-scrolling: touch;
  `}
`

const ModuleFinderSpace = styled.div `
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  transition: width ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
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
  background: #000;
`

const TopBarButton = styled.div`
  position: absolute;
  top: 16px;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: white;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

const ModuleFinderToggle = TopBarButton.extend`
  left: 68px;
  ${({ isEditing }) => isEditing ? `
  ` : `
    box-shadow: 0px 10px 27px -8px rgba(0,0,0,1);
  `}
`

const BackButton = TopBarButton.extend`
  left: 16px;
  box-shadow: 0px 10px 27px -8px rgba(0,0,0,1);
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
  transition: all ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
  ${({ isEditing }) => isEditing ? `
    width: 96px;
    height: 96px;
  ` : `
    width: 480px;
    height: 270px;
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
  user-select: none;
  transition: all ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
  ${({ isEditing }) => isEditing ? `
    height: 100%;
    font-size: 16px;
  ` : `
    height: 48px;
    font-size: 18px;
  `}
`

const CustomPanelWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  transition: all ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
  ${({ isEditing }) => isEditing ? `
    height: 0;
    width: 96px;
    margin-bottom: 0;
  ` : `
    height: calc(100vh - 76px);
    width: calc(100vw - 32px);
    margin-bottom: 8px;
  `}
`

const StyledCustomPanel = styled(CustomPanel)`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  transition: all ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
`

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const ControlFinderSpace = styled.div`
  background: #000;
  transition: height ${EDIT_MODE_TRANSITION / 1000}s ${TRANSITION_TIMEING_FUNC_IN};
  ${({ isEditingPanel }) => isEditingPanel ? `
    height: 480px;
  ` : `
    height: 0
  `}
`

class Preset extends React.Component {
  componentDidMount() {
    this.loadModules(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modulesChanged = !_.isEqual(this.props.modules, nextProps.modules)
    const isEditedChanged = this.props.isEditing !== nextProps.isEditing
    const isEditingPanelChanged = this.props.isEditingPanel !== nextProps.isEditingPanel
    const isPanelHideChanged = this.state.isPanelHide !== nextState.isPanelHide
    const isModuleFinderShownChanged = this.state.isModuleFinderShown !== nextState.isModuleFinderShown
    const isTrashCanVisibleChanged = this.props.isTrashCanVisible !== nextProps.isTrashCanVisible
    return modulesChanged || isEditedChanged || isPanelHideChanged
      ||isModuleFinderShownChanged || isEditingPanelChanged
      || isTrashCanVisibleChanged
  }

  componentWillReceiveProps(nextProps) {
    const presetChanged = this.props.preset.id !== nextProps.preset.id
    if (presetChanged)
      this.loadModules(nextProps)

    const isEditing = nextProps.isEditing
    if (isEditing){
      this.setState({ isPanelHide: true })
      setTimeout(() => this.setState({ isModuleFinderShown: true }), EDIT_MODE_TRANSITION)
    }else{
      this.setState({ isModuleFinderShown: false })
      setTimeout(() => this.setState({ isPanelHide: false }), EDIT_MODE_TRANSITION)
    }
  }

  loadModules(props) {
    const { loadModules, preset } = props
    loadModules(preset)
  }

  constructor(props) {
    super(props)

    this.state = {
      isPanelHide: false,
      isModuleFinderShown: false
    }
  }

  render() {
    const {
      isEditing,
      isEditingPanel,
      isTrashCanVisible,
      preset = {},
      modules,
      loadPreset,
      loadModules,
      setEditMode,
      setEditPanel
    } = this.props
    const {
      isPanelHide,
      isModuleFinderShown
    } = this.state

    return (
      <Root className={this.props.className} isEditing={isEditing}>
        <ModuleFinderToggle
          isEditing={isEditing}
          onClick={e => setEditMode(!isEditing)}>
          { isModuleFinderShown ? '←' : '→'}
        </ModuleFinderToggle>
        <BackButton
          onClick={e => setEditPanel(!isEditingPanel)}>
          { isEditingPanel ? '↑' : '↓'}
        </BackButton>
        <Column>
          <ControlFinderSpace isEditingPanel={isEditingPanel}>
          </ControlFinderSpace>
          <Row>
            <ModuleFinderSpace isEditing={isEditing} >
              {!isModuleFinderShown ? null : (
                <StyledModuleFinder/>
              )}
            </ModuleFinderSpace>
            <ModuleList
              isEditingPanel={isEditingPanel}
              isTrashCanVisible={isTrashCanVisible}>
              <CustomPanelWrapper isEditing={isEditing}>
                {isPanelHide ? null : (
                  <StyledCustomPanel/>
                )}
              </CustomPanelWrapper>
              <DndList
                droppableId={ID.PRESET}
                getItemStyle={() => ({
                  transition: 'all 0.6s',
                  margin: '0 0 8px 0',
                  boxShadow: isEditing ? '0px 10px 44px -8px rgba(0,0,0,1)' : '0px 0px 150px -34px rgba(0,0,0,0.75)'
                })}
                data={modules}
                isDragDisable={() => !isEditing}
                onBindView={(module, index) => (
                  <Module key={index} isEditing={isEditing}>
                    <ModuleName isEditing={isEditing}>
                      {module.config.name}
                    </ModuleName>
                    {isPanelHide ? null :(
                      <StyledPanel index={index} module={module} />
                    )}
                  </Module>
                )}>
              </DndList>
            </ModuleList>
          </Row>
        </Column>
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModulesActions from '@flow/modules/actions'
import * as PresetActions from '@flow/preset/actions'
import * as Config from '@utils/Config'

export default connect(
  state => ({
    preset: state.preset.preset,
    isEditing: state.preset.isEditing,
    isEditingPanel:  state.preset.isEditingPanel,
    isTrashCanVisible: state.moduleFinder.isTrashCanVisible,
    modules: state.modules.modules
  }),
  dispatch => {
    const {
      loadModules,
      loadModulesSuccess
    } = bindActionCreators(ModulesActions, dispatch)
    const {
      startEditPreset,
      finishEditPreset,
      startEditPresetPanel,
      finishEditPresetPanel
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
      },
      setEditPanel(isEditing) {
        if (isEditing)
          startEditPresetPanel()
        else
          finishEditPresetPanel()
      },
    }
  }
)(Preset)