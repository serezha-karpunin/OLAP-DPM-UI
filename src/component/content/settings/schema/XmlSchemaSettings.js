import React, {Component} from 'react'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import Button from 'rambler-ui/Button'
import RequestService from '../../../../service/RequestService';
import {Snackbar, provideSnackbar} from 'rambler-ui/Snackbar'

class XmlSchemaSettings extends Component {
    state = {
        value: '',
    };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openSnackbar = this.openSnackbar.bind(this);
    }

    componentDidMount() {
        this._loadSchema();
    }

    _loadSchema() {
        RequestService.getSchema().then(data => {
            this.setState({value: data});
        });
    }

    onChange(event, value) {
        this.setState({value});
    }

    onClick() {
        RequestService.postSchema(this.state.value)
            .then((response) => {
                if (response.status === 200) {
                    this._loadSchema();
                    this.openSnackbar('200 OK: Schema successfully loaded!')
                } else {
                    this.openSnackbar(`${response.status} Code. Smth went wrong?`)
                }
            })
            .catch(
                error => {
                    this.openSnackbar(`An error occured: ${error}`)
                }
            );
    }

    openSnackbar = (message) => {
        this.props.openSnackbar(
            <Snackbar
                positionY='top'
                positionX='right'
                autoCloseDuration={3000}
                size='small'
                type='main'
            >
                {message}
            </Snackbar>
        )
    };

    render() {
        return (
            <div>
                <FormGroup inline={true} label='Current schema'>
                <Textarea
                    variation='regular'
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder='Schema'
                    style={{width: '100%'}}
                    textareaStyle={{minHeight: '200px'}}/>
                    <Button
                        type='primary'
                        onClick={this.onClick}>
                        UPDATE
                    </Button>
                </FormGroup>
            </div>
        );
    }
}

export default provideSnackbar(XmlSchemaSettings);