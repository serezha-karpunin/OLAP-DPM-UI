import React from 'react';
import FaSort from 'react-icons/lib/fa/sort'
import FaAngleDown from 'react-icons/lib/fa/angle-down'

class IconService {
    static getTableOperationIcon(name) {


        const OPERATIONS = {
            SORT: 'sort',
            EXPAND_POSITION: 'expandPosition'
        };

        switch(name){
            case OPERATIONS.SORT:
                return <FaSort/>;
            case OPERATIONS.EXPAND_POSITION:
                return <FaAngleDown/>;
            default:
                return name;
        }
    }
}

export default IconService;