import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import IconService from "../../../../service/IconService";
import {Timestamp} from 'rambler-ui/Typography'
const DropDownList = (props) => {
    const {droppableId, items} = props;
    const hierarchyIcon = IconService.getTableStructureIcon('hierarchy');
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     style={{
                         backgroundColor: snapshot.isDraggingOver ? 'blue' : 'white',
                         minHeight: '10px',
                         height: '100%'
                     }}>
                    <ul className="dnd-ul">
                        {items.map((item, index) => (
                            <Draggable key={droppableId + item.name} draggableId={item.name} index={index}>
                                {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <li>
                                                <Timestamp>{hierarchyIcon} {item.name}</Timestamp>
                                            </li>
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