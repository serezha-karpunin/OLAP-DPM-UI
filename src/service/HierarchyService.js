import RequestService from "./RequestService";

export default class HierarchyService {
    static executeHierarchyAction(type, action, {showDimensionTitle, showParentMembers}) {
        let url = '';
        switch (type) {
            case HierarchyAction.ADD:
                url = '/hierarchy/add';
                break;
            case HierarchyAction.MOVE:
                url = '/hierarchy/move';
                break;
            case HierarchyAction.REMOVE:
                url = '/hierarchy/remove';
                break;
            case HierarchyAction.CHANGE_AXIS:
                url = '/hierarchy/change';
                break;
        }

        return RequestService.post(url, {}, action, {
            showDimensionTitle,
            showParentMembers
        })
    }

    static createAddHierarchyAction(targetAxisName, hierarchyName, position) {
        return ({
            type: HierarchyAction.ADD,
            action: {
                targetAxisName,
                hierarchyName,
                position
            }
        })
    }

    static createMoveHierarchyAction(targetAxisName, hierarchyName, position) {
        return ({
            type: HierarchyAction.MOVE,
            action: {
                targetAxisName,
                hierarchyName,
                position
            }
        })
    }

    static createRemoveHierarchyAction(targetAxisName, hierarchyName) {
        return ({
            type: HierarchyAction.REMOVE,
            action: {
                targetAxisName,
                hierarchyName
            }
        })
    }

    static createChangeHierarchyAxisAction(sourceAxisName, targetAxisName, hierarchyName, position) {
        return ({
            type: HierarchyAction.CHANGE_AXIS,
            action: {
                sourceAxisName,
                targetAxisName,
                hierarchyName,
                position
            }
        })
    }


}

export const HierarchyAction = {ADD: 'add', MOVE: 'move', REMOVE: 'remove', CHANGE_AXIS: 'changeAxis'};