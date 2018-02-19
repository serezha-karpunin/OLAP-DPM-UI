import React, {Component} from 'react';
import CardWrapper from "../../../layout/CardWrapper";
import DropDownList from "./DragAndDropList";
import {DragDropContext} from 'react-beautiful-dnd';
import HierarchyService from "../../../../service/HierarchyService";
import DefaultList from "./DefaultList";
import IconService from "../../../../service/IconService";

const POSSIBLE_HIERARCHIES = 'possibleHierarchies';

export default class DragAndDropContainer extends Component {

    constructor() {
        super();
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onAddHierarchyClick = this.onAddHierarchyClick.bind(this);
        this.onRemoveHierarchyClick = this.onRemoveHierarchyClick.bind(this);
    }

    onAddHierarchyClick(hierarchyName) {
        const {onDragEnd} = this.props;
        onDragEnd(HierarchyService
            .createAddHierarchyAction('ROWS', hierarchyName, 0));
    }

    onRemoveHierarchyClick(hierarchyName) {
        const {onDragEnd} = this.props;
        onDragEnd(HierarchyService
            .createRemoveHierarchyAction('ROWS', hierarchyName));
    }

    onAddMeasureClick(measureName) {

    }

    handleDragEnd(result) {
        const {source, destination, draggableId} = result;
        const {pivotStructure, onDragEnd} = this.props;


        if (destination) {
            // move action here
            onDragEnd(HierarchyService
                .createMoveHierarchyAction(destination.droppableId, draggableId, destination.index))
        }


        /* if (source.droppableId !== destination.droppableId) {
         const sourceResult = Array.from(pivotStructure[source.droppableId]);
         const [removedItem] = sourceResult.splice(source.index, 1);

         const destinationResult = Array.from(pivotStructure[destination.droppableId]);
         destinationResult.splice(destination.index, 0, removedItem);

         const updatedPivotStructure = Object.assign(pivotStructure, {
         [source.droppableId]: sourceResult,
         [destination.droppableId]: destinationResult,
         }
         );
         const change = {
         hierarchyName: removedItem.name,
         sourceName: source.droppableId,
         destinationName: destination.droppableId
         };

         onDragEnd(updatedPivotStructure, change);
         } else {
         const updatedArray = Array.from(pivotStructure[destination.droppableId]);
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

         onDragEnd(updatedPivotStructure, change);
         }*/
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