import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default class DndList extends React.Component {
  render() {
    const {
      droppableId,
      data,
      onBindView,
      isDragDisable = () => false,
      isDropDisabled = false
    } = this.props

    return (
      <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              height: 'fit-content',
              width: 'fit-content'
            }}>
            {
              data.map((item, index) => (
                <Draggable
                  key={index}
                  index={index}
                  isDragDisabled={isDragDisable(item, index)}
                  draggableId={`${droppableId}-${index}`}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {onBindView(item, index)}
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
    );
  }
}