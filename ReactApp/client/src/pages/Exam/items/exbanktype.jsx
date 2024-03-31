import React from 'react';
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PERSONAL_BANK, SYSTEM_BANK } from '../../../share/constrains.jsx';
import { setExBankType } from '../../../redux-setup/action.jsx';
import ExBank from './exbank.jsx';

const ExBankType = () => {

    const dispatch = useDispatch();
    const exbank = useSelector(state => state.exBankType);

    const handleSelectBankType = (value) => {
        dispatch(setExBankType(value));
    }

    if (exbank !== null) {
        return (
            <div>
                <ExBank />
            </div>
        );
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

export default ExBankType;