import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

export default class DragDropHandler extends React.Component {
  onDragStart() {

  }

  onDragUpdate() {

  }

  onDragEnd(event) {
    console.log('onDragEnd', event)
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
