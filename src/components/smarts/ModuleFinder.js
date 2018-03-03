import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Root = styled.div`
  display: flex;
  overflow: auto;
`

const Module = styled.div`
  width: 200px;
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
  render() {
    return (
      <Root className={this.props.className}>
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{height: 'fit-content'}}>
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <Draggable key={i} draggableId={i} index={i}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ModuleWrapper>
                            <Module>{i}</Module>
                          </ModuleWrapper>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))
              }
            </div>
          )}
        </Droppable>
      </Root>
    );
  }
}