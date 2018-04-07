import React from 'react';
import styled from 'styled-components';
import { DragDropContext as BeautifulDnDContext } from 'react-beautiful-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import DragLayer from '@components/smarts/DragLayer'

const Root = styled.div`
  height: 100%;
`

export const ID = {
  PRESET: 'PRESET',
  MODULE_FINDER: 'MODULE_FINDER',
  TRASH_CAN: 'TRASH_CAN',
}
class DragDropHandler extends React.Component {
  onDragStart(event) {
    const { showTrashCan } = this.props
    const { source: { droppableId: fromId, index: fromIndex } } = event
    if(fromId === ID.PRESET) {
      showTrashCan()
    }
  }

  onDragUpdate(event) {
  }

  onDragEnd(event) {
    const {
      deleteModule,
      insertModule,
      moveModule,
      hideTrashCan,
      modules
    } = this.props
    const {
      source: { droppableId: fromId, index: fromIndex },
      destination
    } = event

    hideTrashCan()

    if(destination === null){
      return
    }
    const { droppableId: toId, index: toIndex } = destination

    if(fromId === toId){
      if(toId === ID.PRESET){
        moveModule(fromIndex, toIndex)
      }
    }else {
      if(fromId.indexOf(ID.MODULE_FINDER) !== -1 && toId === ID.PRESET){
        insertModule(modules[fromIndex], toIndex)
      }else if(fromId === ID.PRESET && toId === ID.TRASH_CAN){
        deleteModule(fromIndex)
      }
    }
  }

  render() {
    return (
      <Root>
        <BeautifulDnDContext
          onDragStart={e => this.onDragStart(e)}
          onDragUpdate={e => this.onDragUpdate(e)}
          onDragEnd={e => this.onDragEnd(e)}>
          { this.props.children }
        </BeautifulDnDContext>
        <DragLayer />
      </Root>
    );
  }
}

DragDropHandler = DragDropContext(TouchBackend({ enableMouseEvents: true }))(DragDropHandler)


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModulesActions from '@flow/modules/actions'
import * as ModuleFinderActions from '@flow/moduleFinder/actions'

export default connect(
  state => ({
    modules: state.moduleFinder.modules
  }),
  dispatch => {
    const {
      deleteModule,
      insertModule,
      moveModule
    } = bindActionCreators(ModulesActions, dispatch)

    const {
      showTrashCan,
      hideTrashCan
    } = bindActionCreators(ModuleFinderActions, dispatch)

    return {
      deleteModule,
      insertModule,
      moveModule,
      showTrashCan,
      hideTrashCan
    }
  }
)(DragDropHandler)