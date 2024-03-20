import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../RepoSelect/RepoSeclect.css'
import { IoIosArrowForward } from "react-icons/io";
import { CgPlayTrackNextO } from "react-icons/cg";
import { FaXmark } from "react-icons/fa6";
import { getLocalStorageItem, setLocalStorageItem } from "../../../../services/LocalStorage";
import { HashLoader } from "react-spinners";
import { GoInbox } from "react-icons/go";
import { toast } from "react-toastify";

export default function RepoSelect() {

    const bid = getLocalStorageItem('bid');

    const [loading, setLoading] = useState(true);

    const [selectNumber, setSelectNumber] = useState(0);

    const [repos, SetRepos] = useState([
        // {
        //     id: '1',
        //     title: 'chương I',
        // },
        // {
        //     id: '2',
        //     title: 'chương II',
        // },
        // {
        //     id: '3',
        //     title: 'chương III',
        // },
        // {
        //     id: '4',
        //     title: 'chương IV',
        // }
    ])

    const [repoSelect, SetRepoSelect] = useState([]);

    const handleRepoSelect = (value) => {
        const isValueExist = repoSelect.includes(value);
        if (isValueExist) {
            const updatedRepoSelect = repoSelect.filter(item => item !== value);
            SetRepoSelect(updatedRepoSelect);
        } else {
            SetRepoSelect(prevState => [...prevState, value]);
        }
    }

    const handleUnSelect = () => {
        SetRepoSelect([]);
    }

    useEffect(() => {
        //get repo by bankid
        setLoading(false);


    })


    useEffect(() => {
        setSelectNumber(repoSelect.length);
    }, [repoSelect]);

    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exam'>Tạo đề kiểm tra</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/exbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/'>Toán 8</NavLink>
            </div>

            <div className="pitem-containers">



                <div className="reposelect">
                    <div className="reposelect-tool">
                        <div className='question-tool repo-tool'>
                            <span className='tool-item' onClick={() => handleUnSelect()}><FaXmark></FaXmark></span>
                            <span className='selectedq'>{selectNumber} được chọn</span>
                            <span className="fake-space"></span>
                            {repoSelect.length === 0 ? (<NavLink onClick={() => toast.info("Hãy chọn ít nhất 1 mục")} className="next"><p>Tiếp tục với lựa chọn</p><CgPlayTrackNextO /></NavLink>) : (<NavLink onClick={() => setLocalStorageItem("repoids",JSON.stringify(repoSelect))} to={'/exconfig'} className="next"><p>Tiếp tục với lựa chọn</p><CgPlayTrackNextO /></NavLink>)}

                        </div>

                        <div className="repolist">
                            <div className="pitem">
                                <span className="thead">Tên</span>

                                <span className="thead"></span>
                            </div>
                            {loading ? (<div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><HashLoader color='#282cc0' /></div>) : repos.length === 0 ? (<div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <GoInbox />
                                <span>Không có dữ liệu</span>
                            </div>) : (repos.map(repo => {
                                return (
                                    <div key={repo.id} onClick={() => handleRepoSelect(repo.id)} className={`pitem titem ${repoSelect.includes(repo.id) ? "selectrepo" : ""}`}>
                                        <span className="td">{repo.title}</span>
                                    </div>
                                )

                            }))}
                        </div>

                    </div>
                    {/* <div className="next">
                        <button className="next-button">Tiếp tục</button>
                    </div> */}
                </div>


            </div>

        </>
    )
}

