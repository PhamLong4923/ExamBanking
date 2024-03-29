import React, { useState } from "react";
import "./popupstyle/popupcreate.css";
import { IoClose } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import modeconfig from "../../share/constrants/bankmode";
import { toast } from 'react-toastify';

const PopupCreateModel = ({ title, handlesuccess, buttonstyle, isactive, islimit }) => {
    const [intitle, setIntitle] = useState('');
    const [open, setOpen] = useState(false);
    // const [banks, setBanks] = useState(banklist);


    const handleOpen = () => {
        if (islimit) {
            toast.error("Đã đạt giới hạn")
        } else {
            setOpen(true);
        }

    }

    const handleClose = () => {
        setOpen(false);
        setIntitle('');
    }

    const handleSuccess = (value) => {
        handlesuccess(value);
        setOpen(false);
    }


    return (
        <>
            {
                isactive ? (<div onClick={() => handleOpen()}>{buttonstyle}</div>) : (<div>{buttonstyle}</div>)
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
                                    ? (<div className="popup-success" onClick={() => handleSuccess(intitle)}>Thêm</div>)
                                    : (<div className="popup-success" style={{ backgroundColor: 'rgb(156, 161, 165)' }}>Thêm</div>)
                            }

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PopupCreateModel;
