import React from 'react';
import FaSort from 'react-icons/lib/fa/sort'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaSiteMap from 'react-icons/lib/fa/sitemap'
import FaPlusSquareO from 'react-icons/lib/fa/plus-square-o'
import FaMinusSquareO from 'react-icons/lib/fa/minus-square-o'

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

    static getTableStructureIcon(name) {
        const STRUCTURE = {
            HIERARCHY: 'hierarchy',
            MEASURE: 'measure',
            ADD: 'add',
            REMOVE: 'remove'
        };

        switch (name) {
            case STRUCTURE.HIERARCHY:
                return <FaSiteMap/>;
            case STRUCTURE.MEASURE:
            case STRUCTURE.ADD:
                return <FaPlusSquareO/>;
            case STRUCTURE.REMOVE:
                return <FaMinusSquareO/>;
            default:
                return name;
        }
    }
}

export default IconService;