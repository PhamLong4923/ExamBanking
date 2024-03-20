import React, { useState } from 'react';
import { FaGear } from 'react-icons/fa6';
import './Profile.css';
import RectangleComponent from './RectangleComponent';

const Profile = () => {
    const initialInfo = {
        name: 'Nguyễn Văn A',
        gmail: 'nva123@gmail.com',
        subject: 'Toán',
        phone: '0912345678',
        avatar: 'https://i.pinimg.com/564x/ca/fe/b2/cafeb2e288f830b582092fdcceea5dee.jpg',
    };

    const [state, setState] = useState(initialInfo);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [editedInfo, setEditedInfo] = useState({ ...initialInfo });
    const [newAvatar, setNewAvatar] = useState('');

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setNewAvatar(reader.result);
        };
        // console.log("FILE:", file);
        // console.log("READER:", reader);
        // console.log("READER RESULT:", reader.result);
    };

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    };

    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setState((prevState) => ({
            ...prevState,
            avatar: newAvatar || prevState.avatar,
        }));
        toggleModal2();
    };


    const handleEditProfile = () => {
        setEditedInfo({ ...state });
        toggleModal2();
    };

    const handleChangePassword = () => {
        // Xử lý đổi mật khẩu
    };

    const handleLogout = () => {
        // Xử lý đăng xuất
    };

    return (
        <div className='profile'>
            <RectangleComponent avatarSrc={state.avatar}>
                <div className="profile-row">
                    <div className>{state.name}</div>
                    <div className="button-container">
                        <button onClick={handleEditProfile}>Chỉnh sửa thông tin</button>
                        <button>Ngân hàng câu hỏi</button>
                        <FaGear className="profile-icon" cursor={"pointer"} size={"40px"} onClick={toggleModal1} />
                    </div>
                </div>
                <div className="row">{state.gmail}</div>
                <div className="row">giáo viên môn {state.subject}</div>
            </RectangleComponent>
            {showModal1 && (
                <div className="profile-modal">
                    <div className="profile-modal-content">
                        <button onClick={handleChangePassword}>Đổi mật khẩu</button>
                        <button onClick={handleLogout}>Đăng xuất</button>
                        <button onClick={toggleModal1}>Đóng</button>
                    </div>
                </div>
            )}
            {showModal2 && (
                <div className="profile-modal">
                    <div className="profile-modal-content">
                        <h2>Chỉnh sửa thông tin</h2>
                        <input type="text" name="name" value={editedInfo.name} onChange={handleChange} />
                        <input type="text" name="gmail" value={editedInfo.gmail} onChange={handleChange} />
                        <input type="text" name="subject" value={editedInfo.subject} onChange={handleChange} />
                        <input type="text" name="phone" value={editedInfo.phone} onChange={handleChange} />
                        <input type="file" accept="image/*" onChange={handleChangeAvatar} />
                        <button onClick={handleSaveChanges}>Lưu thay đổi</button>
                        <button onClick={toggleModal2}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;