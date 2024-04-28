import React, { useState } from "react";
import { Modal, Button, Input, Select, Checkbox } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import ticket from "../../share/ticket";
import ContentGenerator from "../../ultils/paymentcontentcreator";
import { BASE_QR_QUICKLINK, ACCOUNT_NAME } from "../../share/constrains";
import { paymentCreate } from "../../services/api";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode'

const { Option } = Select;
const TicketRenewPaymentModal = ({ start, setClose, tid }) => {
    const [step, setStep] = useState(1);
    const [duration, setDuration] = useState("");
    const [checked, setChecked] = useState(false);
    const [content, setContent] = useState('');
    const [amount, setAmount] = useState(0);
    const token = useSelector(state => state.token);

    // Giải mã token để lấy thông tin trong phần payload
    const decodedToken = jwtDecode(token);

    // Lấy email từ thông tin giải mã
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];


    const qrimg = `${BASE_QR_QUICKLINK}amount=${amount}&addInfo=${content}&accountName=${ACCOUNT_NAME}`;

    // Hàm để lấy giá của duration từ đối tượng ticket
    const getPriceForDuration = (duration) => {
        return ticket.interval[duration]?.price || 0;
    };

    const handleContinue = () => {
        let ct = ContentGenerator({ type: 'TK_U', value: duration, action: tid, email: email });
        setContent(ct);
        // Cập nhật giá trị amount khi duration được chọn
        const price = getPriceForDuration(duration);
        setAmount(price);
        setStep(2);
    };

    const handleComplete = async () => {
        const response = await paymentCreate({ paycontent: content, money: amount });
        console.log(response.data);
        setStep(3);
        setTimeout(() => {
            handleClose();
        }, 1500);
    };

    const handleClose = () => {
        setStep(1);
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
                        <Input
                            placeholder="Gia hạn ticket"
                            disabled
                            style={{ marginBottom: '16px' }}
                        />
                        <Select
                            placeholder="Chọn thời gian"
                            style={{ width: '100%', marginBottom: '16px' }}
                            onChange={(value) => setDuration(value)}
                        >
                            {/* Sử dụng dữ liệu từ file ticket.js để tạo các Option */}
                            {Object.keys(ticket.interval).map(key => (
                                <Option key={key} value={key}>{ticket.interval[key].id + "ngày"}</Option>
                            ))}
                        </Select>
                        <p><strong>Lưu ý:</strong></p>
                        <p>Hiện tại chưa hỗ trợ thanh toán tự động, vì vậy các hoạt động mua bán sẽ phải được duyệt bởi admin.</p>
                        <p>Sau khi tạo yêu cầu và thực hiện thanh toán với nội dung chuyển khoản có sẵn, đội ngũ admin sẽ cố gắng phê duyệt yêu cầu của bạn sớm nhất có thể.</p>
                        <p>Nếu thời gian chờ đợi quá lâu, hãy liên hệ với admin qua số điện thoại hoặc email ở Trang Chủ.</p>
                        <p>Ấn tiếp tục để lấy mã QR</p>
                        <Button type="primary" onClick={() => handleContinue()} disabled={!duration} style={{ marginTop: '16px' }}>Tiếp tục</Button>
                    </form>
                </div>
            )}
            {step === 2 && (
                <div style={{ textAlign: 'center' }}>
                    <img src={qrimg} alt="QR Code" style={{ width: '50%', marginBottom: '16px' }} />
                    <Checkbox onChange={(e) => setChecked(e.target.checked)}>Tôi xác nhận mình đã chuyển khoản</Checkbox>
                    <br />
                    <Button onClick={() => handleClose()} style={{ marginTop: '16px' }}>Hủy</Button>
                    <Button type="primary" onClick={() => handleComplete()} disabled={!checked} style={{ marginLeft: '8px', marginTop: '16px' }}>Hoàn thành</Button>
                </div>
            )}
            {step === 3 && (
                <div style={{ textAlign: 'center' }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                    <span style={{ marginLeft: '8px' }}>Thanh toán đã hoàn thành</span>
                </div>
            )}
        </Modal>
    );
};

export default TicketRenewPaymentModal;

