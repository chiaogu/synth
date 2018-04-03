import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

export const ID = {
  PRESET: 'PRESET',
  MODULE_FINDER: 'MODULE_FINDER',
  TRASH_CAN: 'TRASH_CAN',
}
export class DragDropHandler extends React.Component {
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
      <DragDropContext
        onDragStart={e => this.onDragStart(e)}
        onDragUpdate={e => this.onDragUpdate(e)}
        onDragEnd={e => this.onDragEnd(e)}>
        { this.props.children }
      </DragDropContext>
    );
  }
}

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