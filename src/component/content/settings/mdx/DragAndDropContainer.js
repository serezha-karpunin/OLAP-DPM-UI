import React, {Component} from 'react';
import CardWrapper from "../../../layout/CardWrapper";
import DropDownList from "./DragAndDropList";
import {DragDropContext} from 'react-beautiful-dnd';
import DefaultList from "./DefaultList";
import IconService from "../../../../service/IconService";

export default class DragAndDropContainer extends Component {

    constructor() {
        super();
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onAddHierarchyClick = this.onAddHierarchyClick.bind(this);
        this.onRemoveHierarchyClick = this.onRemoveHierarchyClick.bind(this);
    }

    onAddHierarchyClick(hierarchyName) {
        this.props.onAddHierarchy(hierarchyName);
    }

    onRemoveHierarchyClick(hierarchyName) {
        this.props.onRemoveHierarchy(hierarchyName);
    }

    onMoveHierarchyClick(hierarchyName, position) {
        this.props.onMoveHierarchy(hierarchyName, position);
    }

    onAddMeasureClick(measureName) {

    }

    handleDragEnd(result) {
        const {destination, draggableId} = result;
        const {pivotStructure} = this.props;


        if (destination) {
            this.onMoveHierarchyClick(draggableId, destination.index);
        }


       /* const updatedArray = Array.from(pivotStructure[destination.droppableId]);
        const [removedItem] = updatedArray.splice(source.index, 1);
        updatedArray.splice(destination.index, 0, removedItem);

        const updatedPivotStructure = Object.assign(pivotStructure, {
                [destination.droppableId]: updatedArray
            }
        );
        const change = {
            hierarchyName: removedItem.name,
            sourceName: source.droppableId,
            destinationName: destination.droppableId
        };

        onDragEnd(updatedPivotStructure, change);*/
    }

    render() {
        const {
            pivotStructure: {
                columnAxis,
                rowAxis,
                possibleHierarchies
            }
        } = this.props;

        const hierarchyIcon = IconService.getTableStructureIcon('hierarchy');
        const addIcon = IconService.getTableStructureIcon('add');
        const removeIcon = IconService.getTableStructureIcon('remove');

        return (
            <div className="dnd-content-wrapper">
                <div>
                    <CardWrapper title='Cube structure'>
                        {possibleHierarchies
                            ? <DefaultList
                                title='Hierarchies'
                                listIcon={hierarchyIcon}
                                items={possibleHierarchies}
                                itemIcon={addIcon}
                                onItemIconClick={this.onAddHierarchyClick}
                            />
                            : <div>nothing</div>}
                    </CardWrapper>
                </div>
                <div>
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <CardWrapper title='Pivot structure'>
                            {columnAxis ?
                                <div>
                                    <span> Measures </span>
                                    <DropDownList
                                        droppableId={columnAxis.name}
                                        items={columnAxis.hierarchies}
                                    />
                                </div> : <div/>
                            }
                            {rowAxis ?
                                <div>
                                    <DropDownList
                                        droppableId={rowAxis.name}
                                        title='Hierarchies'
                                        listIcon={hierarchyIcon}
                                        itemIcon={removeIcon}
                                        onItemIconClick={this.onRemoveHierarchyClick}
                                        items={rowAxis.hierarchies}
                                    />
                                </div> : <div/>
                            }
                        </CardWrapper>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}
;