import React from 'react';
import '../Profile/Profile.css';

class Profile extends React.Component {
    state = {
        name: 'Nguyễn Văn A',
        gmail: 'nva123@gmail.com',
        subject: 'Toán',
        phone: '0912345678',
        avatar: 'https://i.pinimg.com/564x/ca/fe/b2/cafeb2e288f830b582092fdcceea5dee.jpg'
    };

    // handleEditClick = () => {
    //     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    // };

    render() {
        return (
            <div className='profile'>
                <div className='back-link'>Home/profile</div>
                <div className='center'>Profile</div>
                <form className='information'>
                    <input type='image' className='avatar' src={this.state.avatar} alt='Ảnh đại diện' />
                    <div className='text-info'>
                        <input type='text' id='name' value={this.state.name}></input>
                        <input type='text' id='gmail' value={this.state.gmail} ></input>
                        <input type='text' id='subject' value={this.state.subject} ></input>
                        <input type='text' id='phone' value={this.state.phone} ></input>
                    </div>
                </form>
                <div className='profile-option'>
                    <button id='edit-avatar'><i class="fa-solid fa-upload"></i> Đổi avatar</button>
                    <button id='edit-information'><i class="fa-solid fa-user-pen"></i> Chỉnh sửa</button>
                    {/* <button id='cancel'><i class="fa-solid fa-xmark"></i> Hủy</button>
                    <button id='save-profile' type='submit'><i class="fa-solid fa-floppy-disk"></i> Lưu</button> */}
                </div>
            </div>
        );
    }
}

export default Profile;