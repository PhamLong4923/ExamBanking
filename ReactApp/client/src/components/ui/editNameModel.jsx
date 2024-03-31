import React, { useEffect, useState } from 'react';
import { Modal, Input, Button } from 'antd';

const EditModal = ({ visible, onCancel, onOk, id, title }) => {
    const [name, setName] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const handleInputChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setIsDirty(newName.trim() !== ''); // Kiểm tra xem nội dung nhập có rỗng không
    };

    const handleCancel = () => {
        setName('');
        setIsDirty(false);
        onCancel();
    };

    const handleOk = () => {
        onOk(id, name);
        setIsDirty(false);
    };

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="change" type="primary" onClick={handleOk} disabled={!isDirty}>
                    Nộp
                </Button>,
            ]}
        >
            <Input value={name} onChange={handleInputChange} />
        </Modal>
    );
};

export default EditModal;
