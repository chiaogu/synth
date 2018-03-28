import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from '@components/dumbs/DndList'
import { ID } from '@components/smarts/DragDropHandler'

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   const isModulesChanged = nextProps.modules !== this.props.modules
  //   const isEditingChanged = nextProps.isEditing !== this.props.isEditing
  //   return isModulesChanged || isEditingChanged
  // }

  componentDidMount() {
    const { isEditing, findModules } = this.props
    findModules()
  }

  render() {
    const {
      modules,
      className
    } = this.props

    return (
      <Root className={className}>
        <DndList
          droppableId={ID.MODULE_FINDER}
          data={modules}
          isDropDisabled={true}
          onBindView={(module, index) => {
            return index === 0 ? (
              <Droppable droppableId={ID.TRASH_CAN}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <TrashCan>TrashCan</TrashCan>
                  </div>
                )}
              </Droppable>
            ) : (
              <ModuleWrapper>
                <Module>{module.name}</Module>
              </ModuleWrapper>
            )
          }}>
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