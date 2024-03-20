import { useState, React, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../ExamConfig/ExamConfig.css'
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { getLocalStorageItem } from "../../../../services/LocalStorage";

export default function ExamConfig() {


    const [loading, setLoading] = useState(true);
    const [repoids, setRepoids] = useState([]);
    const [sections, setSections] = useState([]);
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

    useEffect(() => {
        console.log(dataConfig);
    }, [dataConfig]);


    const handleSubmit = () => {
        // Lọc ra những phần tử có count khác 0
        const dataToSend = dataConfig.filter(item => item.count !== '' && item.count !== '0');
        console.log(dataToSend);
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

    useEffect(() => {
        setRepoids(JSON.parse(getLocalStorageItem("repoids")));
        // if (repoids.length !== 0) {
        //     //load section matrix
        //     setLoading(false);
        // }
    })

    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/'>Toán 8</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
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
                            <th style={{ width: '35%' }}>Bài</th>
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

                        {sections.map(sec => {
                            return (
                                <>
                                    <tr className="mt-tb-config" key={2}>
                                        <td rowSpan={2}>Bài 1: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint obcaecati culpa animi facilis quis sunt, perferendis non veniam maxime libero aspernatur quasi, excepturi minus nihil, debitis dicta provident autem eaque!</td>
                                        <td><input type="number" onChange={(e) => handleInputChange(1, 1, 1, e.target.value)} /></td>
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
                                </>


                            )
                        })}


                        <tr className="mt-tb-config">
                            <td rowSpan={2}>3</td>
                            <td><input type="number" name="1" id="11" onChange={(e) => handleInputChange(1, 1, 1, e.target.value)} /></td>
                            <td><input type="number" onChange={(e) => handleInputChange(1, 1, 2, e.target.value)} /></td>
                            <td><input type="number" name="1" id="11" onChange={(e) => handleInputChange(1, 1, 3, e.target.value)} /></td>
                            <td><input type="number" name="1" id="11" onChange={(e) => handleInputChange(1, 1, 4, e.target.value)} /></td>
                            <td rowSpan={2} className="11">5</td>
                            <td><input type="number" name="1" id="12" onChange={(e) => handleInputChange(1, 2, 5, e.target.value)} /></td>
                            <td><input type="number" name="1" id="12" onChange={(e) => handleInputChange(1, 2, 6, e.target.value)} /></td>
                            <td><input type="number" name="1" id="12" onChange={(e) => handleInputChange(1, 2, 7, e.target.value)} /></td>
                            <td><input type="number" name="1" id="12" onChange={(e) => handleInputChange(1, 2, 8, e.target.value)} /></td>
                            <td rowSpan={2} className="12">5</td>
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
                            <td><input type="number" name="" id="" /></td>
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
                            <td><input type="number" name="" id="" /></td>
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
                            <td><input type="number" name="" id="" /></td>
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
                            <td><input type="number" name="" id="" /></td>
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
                            <td><input type="number" name="" id="" /></td>
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
                {/* <div className="file">
                    <span>Chọn thư mục đích</span>
                    <input id="myInput" type="file" webkitdirectory directory multiple onChange={handleFolderSelect}/>
                    
                </div> */}
                <div className="export" onClick={() => handleSubmit()}>

                    <i class="fa-solid fa-file-import fa-lg"></i>
                    <span>Bắt đầu khởi tạo</span>
                </div>


            </div>

        </>
    )
}

