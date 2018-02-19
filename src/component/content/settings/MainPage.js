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
        this.onDragEnd = this.onDragEnd.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
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

    onDragEnd(/*updatedPivotStructure, */{type, action}) {
        HierarchyService.executeHierarchyAction(
            type, action, this.state.appearanceSettings
        ).then(
            data => this.handleResponse(data)
        )

        /*        this.setState({pivotStructure: updatedPivotStructure},
         () => {
         HierarchyService.executeHierarchyAction(
         type, action, this.state.appearanceSettings
         ).then(
         data => this.handleResponse(data)
         )
         });*/
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
                        onDragEnd={this.onDragEnd}
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
    }
    ;
}

