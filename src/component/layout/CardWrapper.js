import React from 'react';
import './CardWrapper.css'

const CardWrapper = ({title, children}) => {
    return (
        <div className="card-wrapper">
            <div className="card-header">
                {title}
            </div>
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default CardWrapper;