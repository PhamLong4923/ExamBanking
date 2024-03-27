import React, { useState } from "react";
import "./popupstyle/popupcreate.css";
import { IoClose } from "react-icons/io5";

const PopupUpdateModel = ({ title, handlesuccess, buttonstyle, isactive, itemid }) => {
    const [intitle, setIntitle] = useState('');
    const [open, setOpen] = useState(false);
    // const [banks, setBanks] = useState(banklist);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setIntitle('');
    }

    const handleSuccess = (itemid, value) => {
        handlesuccess(itemid, value);
        setOpen(false);
    }


    return (
        <>
            {
                isactive ? (<div className="menu-item item-edit" onClick={() => handleOpen()}>{buttonstyle}</div>) : (<div>{buttonstyle}</div>)
            }


            {open && (
                <div className="popup-model">
                    <div className="popup-container">

                        <div className="popup-title">
                            <span className="title">{title}</span>
                            <div className="popup-close" onClick={() => handleClose()}><IoClose /></div>
                        </div>

                        <div className="popup-edit">
                            <span className="popup-edit-title"><span style={{ color: "red" }}>*</span>Tên hiển thị</span>
                            <input type="text" className="popup-edit-input" required onChange={(e) => setIntitle(e.target.value)} />
                        </div>
                        <div className="popup-finish">
                            <div className="popup-cancel" onClick={() => handleClose()}>Hủy</div>
                            {
                                intitle.length !== 0
                                    ? (<div className="popup-success" onClick={() => handleSuccess(itemid, intitle)}>Thêm</div>)
                                    : (<div className="popup-success" style={{ backgroundColor: 'rgb(156, 161, 165)' }}>Thêm</div>)
                            }

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PopupUpdateModel;
