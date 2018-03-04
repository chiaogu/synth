import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from '@components/dumbs/DndList'

const Root = styled.div`
  display: flex;
  overflow: auto;
`

const Module = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  background: black;
`

const ModuleWrapper = styled.div`
  padding-bottom: 8px;
  box-sizing: border-box;
`

export default class ModuleFinder extends React.Component {
  onBindView(data, i) {
    return (
      <ModuleWrapper>
        <Module>{data}</Module>
      </ModuleWrapper>
    )
  }

  render() {
    return (
      <Root className={this.props.className}>
        <DndList
          droppableId="MODULE_FINDER"
          data={[0,1,2,3,4,5,6,7,8,9]}
          onBindView={this.onBindView}>
        </DndList>
      </Root>
    );
  }
}