import React, { useState } from "react";
import { Modal, Button, Checkbox } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import { BASE_QR_QUICKLINK, ACCOUNT_NAME } from "../../share/constrains";
import { paymentCreate } from "../../services/api";

const VietQrPaymentModal = ({ start, amount, content, setClose, description }) => {
    const [step, setStep] = useState(1);
    const [checked, setChecked] = useState(false);

    const qrimg = `${BASE_QR_QUICKLINK}amount=${amount}&addInfo=${content}&accountName=${ACCOUNT_NAME}`;

    const handleContinue = () => {
        setStep(2);
    };

    const handleComplete = async () => {
        const date = Date.now.toString();
        const response = await paymentCreate({ paycontent: content, money: amount });
        console.log(response.data);
        setStep(3);
        setTimeout(() => {
            setClose(false);
        }, 1500);
    };

    const handleClose = () => {
        setClose(false);
    };

    return (
        <Modal
            open={start}
            footer={null}
            onCancel={() => handleClose()}
        >
            {step === 1 && (
                <div style={{ textAlign: 'center' }}>
                    <h2>Thông tin thanh toán</h2>
                    <form style={{ textAlign: 'left' }}>
                        <p><strong>Số tiền thanh toán:</strong> {amount}</p>
                        <p><strong>Thông tin mặt hàng:</strong> {description}</p>
                        <p><strong>Lưu ý:</strong></p>
                        <p>Hiện tại chưa hỗ trợ thanh toán tự động, vì vậy các hoạt động mua bán sẽ phải được duyệt bởi admin.</p>
                        <p>Sau khi tạo yêu cầu và thực hiện thanh toán với nội dung chuyển khoản có sẵn, đội ngũ admin sẽ cố gắng phê duyệt yêu cầu của bạn sớm nhất có thể.</p>
                        <p>Nếu thời gian chờ đợi quá lâu, hãy liên hệ với admin qua số điện thoại hoặc email ở Trang Chủ.</p>
                        <p>Ấn tiếp tục để lấy mã QR</p>
                    </form>
                    <Button type="primary" onClick={() => handleContinue()}>Tiếp tục</Button>
                </div>
            )}
            {step === 2 && (
                <div style={{ textAlign: 'center' }}>
                    <img src={qrimg} alt="QR Code" style={{ width: '50%', marginBottom: '16px' }} />
                    <Checkbox onChange={(e) => setChecked(e.target.checked)}>Tôi xác nhận mình đã chuyển tiền</Checkbox>
                    <br />
                    <Button onClick={() => handleClose()} style={{ marginTop: '16px' }}>Hủy</Button>
                    <Button type="primary" onClick={() => handleComplete()} disabled={!checked} style={{ marginLeft: '8px', marginTop: '16px' }}>Hoàn thành</Button>
                </div>
            )}
            {step === 3 && (
                <>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                    <span style={{ marginLeft: '8px' }}>Thanh toán đã hoàn thành</span>
                </>
            )}
        </Modal>
    );
};

export default VietQrPaymentModal;
