import React from 'react';
import './RectangleComponent.css';

const RectangleComponent = ({ avatarSrc, items }) => {
    return (
        <div className="rectangle-container">
            <div className="avatar-container">
                <img src={avatarSrc} alt="Avatar" className="avatar-image" />
            </div>
            <div className="info-container">
                <div className="info-content">
                    {items}
                </div>
            </div>
        </div>
    );
};

export default RectangleComponent;
