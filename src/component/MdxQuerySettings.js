import React, {Component} from 'react'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import Button from 'rambler-ui/Button'
import RequestService from '../service/RequestService';

export default class MdxQuerySettings extends Component {

    state = {
        query: 'SELECT {[Measures].[Mark]} ON COLUMNS, {[Students].[All]} ON ROWS FROM [Diplomas]',
        queryResult: '',
    };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event, value) {
        this.setState({
            query: value
        })
    }

    onClick() {
        RequestService.sendQuery(this.state.query).then(data => {
            this.setState({queryResult: data});
        });
    }

    renderTable(data) {
        if (data) {
            const {header, body} = data;
            return (
                <table>
                    <thead>
                    {this.renderRows(header.rows)}
                    </thead>
                    <tbody>
                    {this.renderRows(body.rows)}
                    </tbody>
                </table>
            );
        }
    }

    renderRows(rows) {
        return rows.map((row, index) =>
            <tr key={index}>
                {row.cells.map((cell, index) =>
                    <th key={index}>{cell.label}</th>)}
            </tr>
        );
    }


    render() {
        const {queryResult} = this.state;
        return (
            <div>
                <FormGroup>
                    <Textarea
                        variation='regular'
                        value={this.state.query}
                        onChange={this.onChange}
                        placeholder='MDX query'
                        style={{width: '100%'}}
                        textareaStyle={{minHeight: '50px'}}/>
                    <Button
                        type='primary'
                        onClick={this.onClick}>
                        RUN QUERY
                    </Button>
                    <br/>
                    {this.renderTable(queryResult)}
                    <textarea value={queryResult} style={{width: '100%', minHeight: '60px'}}/>
                </FormGroup>
            </div>
        );
    };
}

