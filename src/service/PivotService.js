import RequestService from "./RequestService";

class PivotService {
    static sendQuery(query, {showDimensionTitle, showParentMembers}) {
        return RequestService.get('/mdx', {}, {
            query,
            showDimensionTitle,
            showParentMembers
        });
    }

    static executeCommand(command, {showDimensionTitle, showParentMembers}) {
        return RequestService.post('/execute', {}, command, {
            showDimensionTitle,
            showParentMembers
        })
    }
}

export default PivotService;