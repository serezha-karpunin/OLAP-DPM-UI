import React, {Component} from 'react'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import Button from 'rambler-ui/Button'
import RequestService from '../service/RequestService';
import PivotTable from "./PivotTable";

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

        RequestService.sendOtherQuery(this.state.query).then(html => {
            this.setState({html: html})
        })
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
                    <PivotTable data={queryResult}/>
                    <textarea value={queryResult} style={{width: '100%', minHeight: '60px'}}/>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
                </FormGroup>
            </div>
        );
    };
}

