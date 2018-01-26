import React from 'react';
import FaSort from 'react-icons/lib/fa/sort'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'

class IconService {
    static getTableOperationIcon(name) {


        const OPERATIONS = {
            SORT: 'sort',
            EXPAND_POSITION: 'expandPosition',
            COLLAPSE_POSITION: 'collapsePosition'
        };

        switch (name) {
            case OPERATIONS.SORT:
                return <FaSort/>;
            case OPERATIONS.EXPAND_POSITION:
                return <FaAngleDown/>;
            case OPERATIONS.COLLAPSE_POSITION:
                return <FaAngleUp/>;
            default:
                return name;
        }
    }
}

export default IconService;