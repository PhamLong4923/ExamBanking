import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined, PhoneOutlined } from '@ant-design/icons';

export const success = (message, duration) => {
    notification.success({
        message: message,
        duration: duration,
        icon: <CheckCircleOutlined />,
    });
};

export const errors = (message, description, duration) => {
    notification.error({
        message: message,
        duration: duration,
        icon: <CloseCircleOutlined />,
    });
};

export const warning = (message, description, duration) => {
    notification.warning({
        message: message,
        duration: duration,
        icon: <WarningOutlined />,
    });
};
