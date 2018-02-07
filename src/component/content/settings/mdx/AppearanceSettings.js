import React, {Component} from 'react';
import Checkbox from 'rambler-ui/Checkbox'

export default class AppearanceSettings extends Component {

    constructor() {
        super();
        this.onShowParentMembersChange = this.onShowParentMembersChange.bind(this);
        this.onShowDimensionTitleChange = this.onShowDimensionTitleChange.bind(this);
    }

    onShowDimensionTitleChange(e, checked) {
        const {onChange, values: {showParentMembers}} = this.props;
        onChange({
            showParentMembers,
            showDimensionTitle: checked
        })
    }

    onShowParentMembersChange(e, checked) {
        const {onChange, values: {showDimensionTitle}} = this.props;
        onChange({
            showParentMembers: checked,
            showDimensionTitle
        })
    }

    render() {
        const {values: {showDimensionTitle, showParentMembers}} = this.props;
        return (
            <div>
                <Checkbox checked={showDimensionTitle} onCheck={this.onShowDimensionTitleChange}>
                    Show dimension title
                </Checkbox>
                <Checkbox checked={showParentMembers} onCheck={this.onShowParentMembersChange}>
                    Show parent members
                </Checkbox>
            </div>
        );
    };
}
