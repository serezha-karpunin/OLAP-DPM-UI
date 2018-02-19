import React, {Component} from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';

class DropDownList extends Component {

    constructor() {
        super();
        this.renderDraggable = this.renderDraggable.bind(this);
        this.renderDraggableContent = this.renderDraggableContent.bind(this);
    }

    renderDraggable = (droppableId) =>
        (item, index) => (
            <Draggable key={droppableId + item.name} type={droppableId} draggableId={item.name} index={index}>
                {this.renderDraggableContent(item)}
            </Draggable>
        );

    renderDraggableContent(item) {
        const {itemIcon, onItemIconClick} = this.props;

        return (provided, snapshot) => (
            <div>
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <li>
                        <span className="icon" onClick={() => onItemIconClick(item.name)}>{itemIcon}</span> {item.name}
                    </li>
                </div>
                {provided.placeholder}
            </div>
        );
    }

    render() {
        const {droppableId, title, listIcon, items} = this.props;

        return (
            <div>
                <div>{listIcon} {title}</div>
                <Droppable droppableId={droppableId} type={droppableId}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} className="dnd-droppable"
                             style={{backgroundColor: snapshot.isDraggingOver ? '#eaeeef' : 'white'}}>
                            <ul className="dnd-ul">
                                {items.map(this.renderDraggable(droppableId))}
                                {provided.placeholder}
                            </ul>
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default DropDownList;