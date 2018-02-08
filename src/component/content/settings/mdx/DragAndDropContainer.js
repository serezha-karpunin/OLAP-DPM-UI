import React, {Component} from 'react';
import CardWrapper from "../../../layout/CardWrapper";
import DropDownList from "./DragAndDropList";
import {DragDropContext} from 'react-beautiful-dnd';
import HierarchyService from "../../../../service/HierarchyService";

const POSSIBLE_HIERARCHIES = 'possibleHierarchies';

export default class DragAndDropContainer extends Component {

    constructor() {
        super();
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    handleDragEnd(result) {
        const {source, destination, draggableId} = result;
        const {pivotStructure, onDragEnd} = this.props;

        if (source.droppableId === POSSIBLE_HIERARCHIES) {
            if (!destination || destination.droppableId === source.droppableId) {
                return;
            } else {
                //add action here
                onDragEnd(HierarchyService
                    .createAddHierarchyAction(destination.droppableId, draggableId, destination.index));
            }
        } else {
            if (!destination || destination.droppableId === POSSIBLE_HIERARCHIES) {
                // remove action here
                onDragEnd(HierarchyService
                    .createRemoveHierarchyAction(source.droppableId, draggableId))

            } else if (destination.droppableId === source.droppableId) {
                // move action here
                onDragEnd(HierarchyService
                    .createMoveHierarchyAction(destination.droppableId, draggableId, destination.index))
            } else {
                // change axis here
                onDragEnd(HierarchyService.createChangeHierarchyAxisAction(
                    source.droppableId, destination.droppableId, draggableId, destination.index))
            }
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

        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <div className="dnd-content-wrapper">
                    <CardWrapper title='Cube structure'>
                        {possibleHierarchies ?
                            <DropDownList
                                droppableId={POSSIBLE_HIERARCHIES}
                                items={possibleHierarchies}
                            /> : <div/>}
                    </CardWrapper>
                    <CardWrapper title='Pivot structure'>
                        {columnAxis ?
                            <div>
                                <span> Column hierarchies </span>
                                <DropDownList
                                    droppableId={columnAxis.name}
                                    items={columnAxis.hierarchies}
                                />
                            </div> : <div/>
                        }
                        {rowAxis ?
                            <div>
                                <span> Row hierarchies </span>
                                <DropDownList
                                    droppableId={rowAxis.name}
                                    items={rowAxis.hierarchies}
                                />
                            </div> : <div/>
                        }
                    </CardWrapper>
                </div>
            </DragDropContext>
        );
    }
}
;