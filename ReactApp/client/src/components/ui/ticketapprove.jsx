import React from 'react';
import { Modal, Button } from 'antd';

const TicketApprove = ({ visible, onCancel, onApply, numberOfTickets }) => {
    return (
        <Modal
            title={`Bạn hiện có ${numberOfTickets} ticket phù hợp.`}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="apply" type="primary" onClick={onApply}>
                    Áp dụng
                </Button>,
            ]}
        >
            <p>Bạn có muốn áp dụng ticket này cho ngân hàng đã chọn không? Sau khi áp dụng sẽ không thể thay đổi lựa chọn.</p>
        </Modal>
    );
};

export default TicketApprove;
