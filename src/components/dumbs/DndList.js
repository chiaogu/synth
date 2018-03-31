import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default class DndList extends React.Component {
  render() {
    const {
      droppableId,
      data,
      onBindView,
      getIndex = index => index,
      isDragDisable = () => false,
      isDropDisabled = false,
      getItemStyle = index => ({})
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
                  index={getIndex(index)}
                  isDragDisabled={isDragDisable(item, index)}
                  draggableId={`${droppableId}-${index}`}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...getItemStyle(index),
                          ...provided.draggableProps.style
                        }}
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