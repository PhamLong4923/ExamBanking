import React from 'react';
import { Modal, Button } from 'antd';

const KitNewbie = ({ visible, onCancel, onApply }) => {
    return (
        <Modal
            title="Kit cho người mới"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>
            ]}
        >
            <div style={{ textAlign: 'center' }}>
                <img src="link-to-your-image.jpg" alt="Kit cho người mới" style={{ width: 300, height: 150 }} />
            </div>
            <div style={{ marginTop: 20 }}>
                <p>Chào mừng bạn đến với dịch vụ ExamBanking, mỗi tài khoản sẽ được miễn phí 2 ticket khởi đầu, 1 ticket dành cho ngân hàng cá nhân và 1 ticket dành cho ngân hàng hệ thống.</p>
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button type="primary" onClick={onApply}>Nhận kit cho người mới</Button>
            </div>
        </Modal>
    );
};

export default KitNewbie;
