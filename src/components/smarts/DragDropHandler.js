import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

export const ID = {
  PRESET: 'PRESET',
  MODULE_FINDER: 'MODULE_FINDER'
}
export class DragDropHandler extends React.Component {
  onDragStart() {

  }

  onDragUpdate() {

  }

  onDragEnd(event) {
    const {
      source: { droppableId: fromId, index: fromIndex },
      destination
    } = event

    if(destination === null){
      return
    }
    const { droppableId: toId, index: toIndex } = destination

    if(fromId === toId){
      if(toId === ID.PRESET){
        this.moveModule(fromIndex, toIndex)
      }
    }else {
      if(toId === undefined){

      }else if(fromId === ID.MODULE_FINDER && toId === ID.PRESET){
        this.insertModule(fromIndex, toIndex)
      }
    }
  }

  moveModule(from, to) {
    const { moveModule } = this.props
    moveModule(from, to)
  }

  insertModule(from, to) {
    const { insertModule, modules } = this.props
    insertModule(modules[from], to)
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
import * as ModulesActions from '@state/modules/actions'

export default connect(
  state => ({
    modules: state.moduleFinder.modules
  }),
  dispatch => {
    const {
      insertModule,
      moveModule
    } = bindActionCreators(ModulesActions, dispatch)
    return {
      insertModule,
      moveModule
    }
  }
)(DragDropHandler)