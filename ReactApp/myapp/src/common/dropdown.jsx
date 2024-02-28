import React from 'react';
import './Style/dropdown.css';

const Dropdown = ({ id, visible, onClose }) => {
    const handleDeleteClick = () => {
        // Xử lý sự kiện khi click vào mục Xóa
        console.log(`Clicked delete in dropdown with ID: ${id}`);
        onClose();
    };

    const handleEditClick = () => {
        // Xử lý sự kiện khi click vào mục Chỉnh sửa
        console.log(`Clicked edit in dropdown with ID: ${id}`);
        onClose();
    };

    return (
        <div className={`menu-dropdown ${visible ? 'active' : ''}`}>
            <div className='menu-item item-delete' onClick={handleDeleteClick}>
                <i className="fa-solid fa-trash fa-xl"></i>
                <span className='menu-choice'>Xóa</span>
            </div>

            <div className='menu-item item-edit' onClick={handleEditClick}>
                <i className="fa-solid fa-gear fa-xl"></i>
                <span className='menu-choice'>Chỉnh sửa</span>
            </div>
        </div>
    );
};

export default Dropdown;
