import React, {Component} from 'react'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import Button from 'rambler-ui/Button'
import RequestService from '../service/RequestService';
import PivotTable from "./PivotTable";
import CardWrapper from "./CardWrapper";

export default class MdxQuerySettings extends Component {

    state = {
        query: 'SELECT {[Measures].[Mark]} ON COLUMNS, {[Students].[All]} ON ROWS FROM [Diplomas]',
        queryResult: '',
    };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onCommandExecute = this.onCommandExecute.bind(this);
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

        // RequestService.sendOtherQuery(this.state.query).then(html => {
        //     this.setState({html: html})
        // })
    }

    onCommandExecute(command){
        RequestService.executeCommand(command).then(data => {
            this.setState({queryResult: data});
        });
    }

    render() {
        const {queryResult} = this.state;
        return (
            <div>
                <CardWrapper>
                    <PivotTable data={queryResult} onCommand={this.onCommandExecute}/>
                </CardWrapper>
                <CardWrapper>
                    <FormGroup>
                        <Textarea
                            variation='regular'
                            value={this.state.query}
                            onChange={this.onChange}
                            placeholder='MDX query'
                            style={{width: '100%'}}
                            textareaStyle={{minHeight: '50px'}}/>
                    </FormGroup>
                    <Button
                        type='primary'
                        size='small'
                        onClick={this.onClick}>
                        Run query
                    </Button>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
                </CardWrapper>
            </div>
        );
    };
}

