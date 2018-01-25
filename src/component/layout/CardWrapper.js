import React from 'react';
import './CardWrapper.css'

const CardWrapper = (props) => {
    return (
        <div className="card-wrapper">
            {props.children}
        </div>
    );
};

export default CardWrapper;