import React, { useState } from 'react';
import './Style/dropdown.css';
import PopupUpdateModel from '../components/EditPopup/popupupdate';

const Dropdown = ({ id, visible, onDelete, onEdit }) => {
    const [openconfirm, setOpenConfirm] = useState(false);

    const handleDelete = () => {
        setOpenConfirm(true);
    }

    const handleConfirm = () => {
        onDelete(id);
        setOpenConfirm(false);
    }

    const handleClose = () => {
        setOpenConfirm(false);
    }

    return (
        <div className={`menu-dropdown ${visible ? 'active' : ''}`}>
            <div className='menu-item item-delete' onClick={() => handleDelete()}>

                <span className='menu-choice'>Xóa</span>
            </div>
            <PopupUpdateModel
                itemid={id}
                buttonstyle={

                    <span className='menu-choice'>Chỉnh sửa</span>
                }
                handlesuccess={onEdit}
                title={"Chỉnh sửa tên hiển thị"}
                isactive={true}
            >

            </PopupUpdateModel>

            {
                openconfirm &&
                <div className="fixed z-9 inset-0 flex items-center justify-center">
                    <div className="absolute rounded-lg p-8 border border-gray-300 shadow-md" style={{ backgroundColor: '#f3f4f6', backdropFilter: 'blur(4px)' }}>
                        <p>Bạn có muốn tiếp tục ?</p>
                        <div className="mt-4 flex justify-center">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {
                                handleConfirm();
                            }}>Có</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => handleClose()}>Không</button>
                        </div>
                    </div>
                </div>
            }



        </div>
    );
};

export default Dropdown;
