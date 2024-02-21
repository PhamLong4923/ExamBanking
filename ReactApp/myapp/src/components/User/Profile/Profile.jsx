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
                            <i class="fa-solid fa-gear"></i>
                        </div>
                    </div>
                    <div className="row">{this.state.name}</div>
                    <div className="row">giáo viên môn {this.state.subject}</div>
                </RectangleComponent>
            </div>
        );
    }
}

export default Profile;