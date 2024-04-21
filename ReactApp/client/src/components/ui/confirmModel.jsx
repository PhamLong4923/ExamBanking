import React from 'react';
import { Modal } from 'antd';

const ConfirmationModal = ({ title, isvisible, onOk, onCancel }) => {
    return (
        <Modal
            title={title}
            visible={isvisible}
            onOk={onOk}
            onCancel={onCancel}
            maskClosable={true}
            okText="OK"
            cancelText="Cancel"
            centered
        >
            <p>Bạn có chắc chắn thực hiện hành động này ?</p>
        </Modal>
    );
};

export default ConfirmationModal;
