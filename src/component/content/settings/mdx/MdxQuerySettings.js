import React, {Component} from 'react';
import RequestService from '../../../../service/RequestService';
import PivotTable from "./PivotTable";
import CardWrapper from "../../../layout/CardWrapper";
import MdxQueryEditor from "./MdxQueryEditor";

export default class MdxQuerySettings extends Component {

    state = {
        mdxQuery: 'SELECT {[Measures].[Mark]} ON COLUMNS, {[Students].[All]} ON ROWS FROM [Diplomas]',
        mdxQueryResult: '',
    };

    constructor() {
        super();
        this.onMdxQueryChange = this.onMdxQueryChange.bind(this);
        this.onMdxQuerySubmit = this.onMdxQuerySubmit.bind(this);
        this.onCommandExecute = this.onCommandExecute.bind(this);
    }

    onMdxQueryChange(event, value) {
        this.setState({
            mdxQuery: value
        })
    }

    onMdxQuerySubmit() {
        RequestService.sendQuery(this.state.mdxQuery).then(data => {
            this.setState({mdxQueryResult: data.table, mdxQuery: data.query});
        });
    }

    onCommandExecute(command) {
        RequestService.executeCommand(command).then(data => {
            this.setState({mdxQueryResult: data.table, mdxQuery: data.query});
        });
    }

    render() {
        const {mdxQuery, mdxQueryResult} = this.state;
        return (
            <div>
                <CardWrapper>
                    <PivotTable data={mdxQueryResult} onCommand={this.onCommandExecute}/>
                </CardWrapper>
                <CardWrapper>
                    <MdxQueryEditor query={mdxQuery} onClick={this.onMdxQuerySubmit} onChange={this.onMdxQueryChange}/>
                </CardWrapper>
            </div>
        );
    };
}

