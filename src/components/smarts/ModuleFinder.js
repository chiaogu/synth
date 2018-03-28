import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from '@components/dumbs/DndList'
import { ID } from '@components/smarts/DragDropHandler'

const Root = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`

const ModuleGrid = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, 96px);
  justify-content: center;
  margin: 80px 16px 16px 16px;
  width: calc(100% - 32px);
`

const ModuleWrapper = styled.div`
  width: 96px;
  height: 96px;
`

const Module = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
  text-align: center;
`

const TrashCan = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
`

class ModuleFinder extends React.Component {

  componentDidMount() {
    const { findModules } = this.props
    findModules()
  }

  render() {
    const {
      modules,
      className
    } = this.props

    return (
      <Root className={className}>
        <ModuleGrid>
          {modules.map((module, index) => (
            <ModuleWrapper key={index}>
              <DndList
                droppableId={`${ID.MODULE_FINDER}.${index}`}
                data={[module]}
                isDropDisabled={true}
                gap={'8px'}
                getIndex={() => index}
                onBindView={(module, index) => (
                  <Module>{module.name}</Module>
                )}>
              </DndList>
            </ModuleWrapper>
          ))}
        </ModuleGrid>
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