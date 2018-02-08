import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';

const DropDownList = (props) => {
    const {droppableId, items} = props;
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                    <ul>
                        {items.map((item, index) => (
                            <Draggable key={droppableId + item.name} draggableId={item.name} index={index}>
                                {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <li> {item.name}</li>
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                </div>
            )}
        </Droppable>
    );
};

export default DropDownList;