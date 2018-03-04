import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from '@components/dumbs/DndList'

const Root = styled.div`
  overflow: auto;
`

const Module = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
  text-align: center;
`

const ModuleWrapper = styled.div`
  padding-bottom: 8px;
  box-sizing: border-box;
`

class ModuleFinder extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   const isModulesChanged = nextProps.modules !== this.props.modules
  //   const isEditingChanged = nextProps.isEditing !== this.props.isEditing
  //   return isModulesChanged || isEditingChanged
  // }

  componentWillReceiveProps(nextProps) {
    const { isEditing, findModules } = nextProps
    const isEditingChanged = nextProps.isEditing !== this.props.isEditing
    if(isEditing && isEditingChanged){
      findModules()
    }
  }

  render() {
    const {
      modules,
      className
    } = this.props

    return (
      <Root className={className}>
        <DndList
          droppableId="MODULE_FINDER"
          data={modules}
          isDropDisabled={true}
          onBindView={(module, index) => (
            <ModuleWrapper>
              <Module>{module.name}</Module>
            </ModuleWrapper>
          )}>
        </DndList>
      </Root>
    );
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModuleFinderActions from '@state/moduleFinder/actions'
import * as Config from '@utils/Config'

export default connect(
  state => ({
    modules: state.moduleFinder.modules,
    isEditing: state.preset.isEditing
  }),
  dispatch => {
    const {
      findModules,
      findModulesSuccess
    } = bindActionCreators(ModuleFinderActions, dispatch)
    return {
      findModules(params) {
        findModules()
        Config.findModules(params).then(modules => {
          findModulesSuccess(modules)
        })
      }
    }
  }
)(ModuleFinder)