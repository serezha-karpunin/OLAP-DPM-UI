import React from 'react';
const DefaultList = (props) => {
    const {title, listIcon, items, itemIcon, onItemIconClick} = props;

    return (
        <div>
            <div>{listIcon} {title}</div>
            <ul className="dnd-ul">
                {items.map((item, index) => (
                    <li key={index}>
                        <span className="icon" onClick={() => onItemIconClick(item.name)}>{itemIcon}</span> {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DefaultList;