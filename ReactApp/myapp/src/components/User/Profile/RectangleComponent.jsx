import React from 'react';
import './RectangleComponent.css';

const RectangleComponent = ({ avatarSrc, children }) => {
    return (
        <div className="rectangle-container">
            <div className="avatar-container">
                <img src={avatarSrc} alt="Avatar" className="avatar-image" />
            </div>
            <div className="info-container">
                <div className="info-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RectangleComponent;
