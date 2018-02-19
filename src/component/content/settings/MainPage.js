import React, {Component} from 'react';
import PivotService from "../../../service/PivotService";
import HierarchyService from "../../../service/HierarchyService";
import DragAndDropContainer from "./mdx/DragAndDropContainer";
import CardWrapper from "../../layout/CardWrapper";
import AppearanceSettings from "./mdx/AppearanceSettings";
import PivotTable from "./mdx/PivotTable";
import MdxQueryEditor from "./mdx/MdxQueryEditor";

export default class MainPage extends Component {

    state = {
        mdxQuery: 'SELECT {[Measures].[Committee mark]} ON COLUMNS, {[Students].[All]} ON ROWS FROM [Diplomas]',
        mdxQueryResult: '',
        appearanceSettings: {
            showDimensionTitle: true,
            showParentMembers: true
        },
        pivotStructure: {}
    };

    constructor() {
        super();
        this.onMdxQueryChange = this.onMdxQueryChange.bind(this);
        this.onMdxQuerySubmit = this.onMdxQuerySubmit.bind(this);
        this.onCommandExecute = this.onCommandExecute.bind(this);
        this.onAppearanceSettingsChange = this.onAppearanceSettingsChange.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
        this.handleResponse = this.handleResponse.bind(this);

        this.onAddHierarchy = this.onAddHierarchy.bind(this);
        this.onRemoveHierarchy = this.onRemoveHierarchy.bind(this);
        this.onMoveHierarchy = this.onMoveHierarchy.bind(this);

    }

    onAppearanceSettingsChange(settings) {
        this.setState({appearanceSettings: settings}, () => this.refreshTable());
    }

    onMdxQueryChange(event, value) {
        this.setState({
            mdxQuery: value
        });
    }

    refreshTable() {
        PivotService.sendQuery(
            this.state.mdxQuery,
            this.state.appearanceSettings
        ).then(data => this.handleResponse(data));
    }

    onMdxQuerySubmit() {
        this.refreshTable();
    }

    onAddHierarchy(hierarchyName) {
        HierarchyService.addHierarchy(hierarchyName, this.state.appearanceSettings)
            .then(
                data => this.handleResponse(data)
            );
    }

    onRemoveHierarchy(hierarchyName) {
        HierarchyService.removeHierarchy(hierarchyName, this.state.appearanceSettings)
            .then(
                data => this.handleResponse(data)
            );
    }

    onMoveHierarchy(hierarchyName, position) {
        HierarchyService.moveHierarchy(hierarchyName, position, this.state.appearanceSettings)
            .then(
                data => this.handleResponse(data)
            );
    }

    handleResponse(data) {
        const {table, query, metadata: {rowAxis, columnAxis, possibleHierarchies}} = data;
        this.setState({
                mdxQueryResult: table,
                mdxQuery: query,
                pivotStructure: {
                    rowAxis,
                    columnAxis,
                    possibleHierarchies
                }
            }
        )
    }

    onCommandExecute(command) {
        PivotService.executeCommand(
            command,
            this.state.appearanceSettings
        ).then(data => this.handleResponse(data));
    }

    render() {
        const {
            mdxQuery,
            mdxQueryResult,
            appearanceSettings,
            pivotStructure
        } = this.state;

        return (
            <div className="main-page-content">
                <div className="structure-item">
                    <DragAndDropContainer
                        pivotStructure={pivotStructure}
                        onAddHierarchy={this.onAddHierarchy}
                        onRemoveHierarchy={this.onRemoveHierarchy}
                        onMoveHierarchy={this.onMoveHierarchy}
                    />
                </div>
                <div className="appearance-settings-item">
                    <CardWrapper title='Appearance settings'>
                        <AppearanceSettings
                            onChange={this.onAppearanceSettingsChange}
                            values={appearanceSettings}
                        />
                    </CardWrapper>
                </div>
                <div className="pivot-table-item">
                    <CardWrapper title='Pivot table'>
                        <PivotTable data={mdxQueryResult} onCommand={this.onCommandExecute}/>
                    </CardWrapper>
                </div>
                <div className="mdx-query-editor-item">
                    <CardWrapper title='MDX Query'>
                        <MdxQueryEditor query={mdxQuery} onClick={this.onMdxQuerySubmit}
                                        onChange={this.onMdxQueryChange}/>
                    </CardWrapper>
                </div>
            </div>
        );
    };
}

