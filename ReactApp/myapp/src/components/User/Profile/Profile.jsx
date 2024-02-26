import React from 'react';
import '../Profile/Profile.css';
import RectangleComponent from './RectangleComponent';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Nguyễn Văn A',
            gmail: 'nva123@gmail.com',
            subject: 'Toán',
            phone: '0912345678',
            avatar: 'https://i.pinimg.com/564x/ca/fe/b2/cafeb2e288f830b582092fdcceea5dee.jpg',
            showModal1: false,
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({ showModal1: !prevState.showModal1 }));
    };

    // Thêm hàm để xử lý các tác vụ khi người dùng chọn một mục trong menu
    handleChangePassword = () => {
        // Xử lý đổi mật khẩu
    };

    handleLogout = () => {
        // Xử lý đăng xuất
    };

    // handleEditClick = () => {
    //     this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    // };

    render() {
        return (
            <div className='profile'>
                <RectangleComponent avatarSrc={this.state.avatar}>
                    <div className="profile-row">
                        <div className>{this.state.gmail}</div>
                        <div className="button-container">
                            <button className="button">Chỉnh sửa thông tin</button>
                            <button className="button">Ngân hàng câu hỏi</button>
                            <i className="fa-solid fa-gear" onClick={this.toggleModal}></i>
                        </div>
                    </div>
                    <div className="row">{this.state.name}</div>
                    <div className="row">giáo viên môn {this.state.subject}</div>
                    {this.state.showMenu && (
                        <div className="menu">
                            <button onClick={this.handleChangePassword}>Đổi mật khẩu</button>
                            <button onClick={this.handleLogout}>Đăng xuất</button>
                        </div>
                    )}
                </RectangleComponent>
                {this.state.showModal1 && (
                    <div className="modal">
                        <div className="modal-content">
                            <button onClick={this.handleChangePassword}>Đổi mật khẩu</button>
                            <button onClick={this.handleLogout}>Đăng xuất</button>
                            <button onClick={this.toggleModal}>Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;