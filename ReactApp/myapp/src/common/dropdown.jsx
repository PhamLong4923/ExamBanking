import React from 'react';
import './Style/dropdown.css';

const Dropdown = ({ visible, onDelete, onEdit }) => {
    return (
        <div className={`menu-dropdown ${visible ? 'active' : ''}`}>
            <div className='menu-item item-delete' onClick={onDelete}>
                <i className="fa-solid fa-trash fa-xl"></i>
                <span className='menu-choice'>Xóa</span>
            </div>

            <div className='menu-item item-edit' onClick={onEdit}>
                <i className="fa-solid fa-gear fa-xl"></i>
                <span className='menu-choice'>Chỉnh sửa</span>
            </div>
        </div>
    );
};

export default Dropdown;
