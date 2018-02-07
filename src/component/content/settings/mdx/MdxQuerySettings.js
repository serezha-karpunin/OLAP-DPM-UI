import React, {Component} from 'react';
import PivotTable from "./PivotTable";
import CardWrapper from "../../../layout/CardWrapper";
import MdxQueryEditor from "./MdxQueryEditor";
import AppearanceSettings from "./AppearanceSettings";
import PivotService from "../../../../service/PivotService";
import HierarchyService from "../../../../service/HierarchyService";
import DragAndDropContainer from "./DragAndDropContainer";
import './MdxQuerySettings.css'

export default class MdxQuerySettings extends Component {

    state = {
        mdxQuery: 'SELECT {[Measures].[Mark]} ON COLUMNS, {[Students].[All]} ON ROWS FROM [Diplomas]',
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
            <div className="mdx-settings-tab">
                <div>
                    <DragAndDropContainer
                        pivotStructure={pivotStructure}
                        onDragEnd={this.onDragEnd}
                    />
                </div>
                <div>
                    <CardWrapper title='Appearance settings'>
                        <AppearanceSettings
                            onChange={this.onAppearanceSettingsChange}
                            values={appearanceSettings}
                        />
                    </CardWrapper>
                    <CardWrapper title='Pivot table'>
                        <PivotTable data={mdxQueryResult} onCommand={this.onCommandExecute}/>
                    </CardWrapper>
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

