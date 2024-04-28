
const ContentGenerator = ({ type, value, action, email }) => {

    // Tạo chuỗi content dựa trên các thông tin đã có
    const ct = 'EBS_' + type + "_" + action + "_" + value + "_" + email;
    console.log(ct);
    return ct;
}

export default ContentGenerator;
