import React from 'react'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import Button from 'rambler-ui/Button'

const MdxQueryEditor = (props) => {
    const {query, onChange, onClick} = props;
    return (
        <div>
            <FormGroup>
                <Textarea
                    variation='regular'
                    value={query}
                    onChange={onChange}
                    placeholder='MDX query'
                    style={{width: '100%'}}
                    textareaStyle={{minHeight: '50px'}}/>
            </FormGroup>
            <Button
                type='primary'
                size='small'
                onClick={onClick}>
                Run query
            </Button>
        </div>
    )
};

export default MdxQueryEditor;