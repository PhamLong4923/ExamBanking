import { useState, React } from "react";
import { NavLink } from "react-router-dom";
import '../ExamConfig/ExamConfig.css'
import axios from "axios";

export default function ExamConfig() {

    const [dataConfig, setDataConfig] = useState([]);

    const handleInputChange = (sectionId, type, mode, value) => {
        // Tìm xem có phần tử nào trong mảng state đã tồn tại với sectionId, type và mode tương ứng không
        const existingIndex = dataConfig.findIndex(item => item.sectionId === sectionId && item.type === type && item.mode === mode);

        // Nếu đã tồn tại, cập nhật giá trị count
        if (existingIndex !== -1) {
            const updatedData = [...dataConfig];
            updatedData[existingIndex].count = value;
            setDataConfig(updatedData);
        } else {
            // Nếu chưa tồn tại, thêm mới vào mảng state
            setDataConfig(prevState => [...prevState, { sectionId, type, mode, count: value }]);
        }
    };

    const handleSubmit = () => {
        // Lọc ra những phần tử có count khác 0
        const dataToSend = dataConfig.filter(item => item.count !== 0);

        // Gửi dữ liệu lên API
        axios.post('url_to_your_backend_api', dataToSend)
            .then(response => {
                // Xử lý kết quả từ backend nếu cần
            })
            .catch(error => {
                // Xử lý lỗi nếu có
            });
    };

    const handleFolderSelect = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
        }
    };    

    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/'>Toán 8</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/'>Ma trận</NavLink>
            </div>

            <div className="matrix-containers">
                <table className="matrix">
                    <thead>
                        <tr className="mt-tb-header1">
                            <th>Toán 8</th>
                            <th colSpan={5}>Trắc nghiệm</th>
                            <th colSpan={5}>Tự luận</th>
                        </tr>
                        <tr className="mt-tb-header2">
                            <th>Bài</th>
                            <th>Nhận biết</th>
                            <th>Thông hiểu</th>
                            <th>Vận dụng</th>
                            <th>Vận dụng cao</th>
                            <th>Tổng</th>
                            <th>Dễ</th>
                            <th>Trung bình</th>
                            <th>Khó</th>
                            <th>Nâng cao</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr className="mt-tb-config" key={2}>
                            <td rowSpan={2}>Bài 1: làm sao để uống nước bằng mồm ahhahahahhahahahhahah</td>
                            <td><input type="text" onChange={(e) => handleInputChange(1, 1, 1, e.target.value)} /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td rowSpan={2}>5</td>

                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>


                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="text" name="" id="" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td><input type="number" name="" id="" /></td>
                            <td rowSpan={2}>5</td>
                        </tr>
                        <tr className="mt-tb-total">
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>

                        
                    </tbody>

                </table>



            </div>

            <div className="finishconfig">
                <div className="number">
                    <span>Số lượng :</span>
                    <input type="number" name="" id="" />
                </div>
                <div className="file">
                    <span>Chọn thư mục đích</span>
                    <input id="myInput" type="file" webkitdirectory directory multiple onChange={handleFolderSelect}/>
                    
                </div>
                <div className="export">
                    
                <i class="fa-solid fa-file-import fa-lg"></i>
                <span>Bắt đầu khởi tạo</span>
                </div>


            </div>

        </>
    )
}

