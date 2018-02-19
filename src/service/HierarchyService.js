import RequestService from "./RequestService";

export default class HierarchyService {

    static addHierarchy(hierarchyName, {showDimensionTitle, showParentMembers}){
        return RequestService.post('/hierarchy/add', {}, {}, {
            hierarchyName,
            showDimensionTitle,
            showParentMembers
        })
    }

    static removeHierarchy(hierarchyName, {showDimensionTitle, showParentMembers}){
        return RequestService.post('/hierarchy/remove', {}, {}, {
            hierarchyName,
            showDimensionTitle,
            showParentMembers
        })
    }

    static moveHierarchy(hierarchyName, position, {showDimensionTitle, showParentMembers}){
        return RequestService.post('/hierarchy/move', {}, {}, {
            hierarchyName,
            position,
            showDimensionTitle,
            showParentMembers
        })
    }
}