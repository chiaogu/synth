import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from '@components/dumbs/DndList'
import { ID } from '@components/smarts/DragDropHandler'

const Root = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`

const TrashCanWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
`

const TrashCan = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #888;
`

const ModuleGrid = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, 96px);
  justify-content: center;
  margin: 68px 16px 16px 16px;
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
  font-size: 16px;
  user-select: none;
`

class ModuleFinder extends React.Component {

  componentDidMount() {
    const { findModules } = this.props
    findModules()
  }

  render() {
    const {
      modules,
      className,
      isTrashCanVisible
    } = this.props

    return (
      <Root className={className}>
        { !isTrashCanVisible ? null : (
          <TrashCanWrapper>
            <Droppable droppableId={ID.TRASH_CAN}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}
                  {...provided.droppableProps}>
                    <TrashCan>TrashCan</TrashCan>
                </div>
              )}
            </Droppable>
          </TrashCanWrapper>
        )}
        <ModuleGrid>
          {modules.map((module, index) => (
            <ModuleWrapper key={index}>
              <DndList
                droppableId={`${ID.MODULE_FINDER}.${index}`}
                data={[module]}
                isDropDisabled={true}
                getItemStyle={() => ({
                  margin: '0 0 8px 0',
                  boxShadow: '0px 10px 44px -8px rgba(0,0,0,1)'
                })}
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
    isTrashCanVisible: state.moduleFinder.isTrashCanVisible,
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