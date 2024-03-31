import React from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { PERSONAL_BANK, SYSTEM_BANK } from '../../../share/constrains';
import { setBankType } from '../../../redux-setup/action.jsx';

const BankType = () => {

    const dispatch = useDispatch();

    const handleSelectBankType = (value) => {
        if (value === PERSONAL_BANK) {
            dispatch(setBankType(PERSONAL_BANK));
        } else if (value === SYSTEM_BANK) {
            dispatch(setBankType(SYSTEM_BANK));
        }
    }

    return (
        <div style={{ background: '#fff', padding: 24, minHeight: 360, display: 'flex', justifyContent: 'space-evenly' }}>
            <Card
                title="Ngân hàng hệ thống"
                style={{ width: 300, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.7s' }}
                hoverable
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                onClick={() => handleSelectBankType(SYSTEM_BANK)}
            >
                <p>Thông tin về ngân hàng hệ thống sẽ được hiển thị ở đây.</p>
            </Card>
            <Card
                title="Ngân hàng cá nhân"
                style={{ width: 300, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.7s' }}
                hoverable
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                onClick={() => handleSelectBankType(PERSONAL_BANK)}
            >
                <p>Thông tin về ngân hàng cá nhân sẽ được hiển thị ở đây.</p>
            </Card>
        </div>
    );
};

export default BankType;
