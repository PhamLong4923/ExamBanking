import React from "react";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import Sidebar from "../../components/UI/Sidebar";
import './AccountManager.css';

class AccountManager extends React.Component {
    state = {

    }
    render() {
        return (
            <>
                <Header></Header>
                <div className="accountmanager">
                    <div className="back-link   ">Home/Account manager</div>
                    <h2 className='center-accountmanager'>Account manager</h2>
                    <div className="search-part">
                        <button><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                        <input placeholder="Nhập nội dung tìm kiếm..."></input>
                    </div>
                    <table className="account-list" border={1}>
                        <thead>
                            <td>
                                id
                            </td>
                            <td>
                                tên
                            </td>
                            <td>
                                gmail
                            </td>
                            <td>
                                chuyên môn
                            </td>
                            <td>
                                trạng thái
                            </td>
                        </thead>
                        <tr>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                        </tr>
                        <tr>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                            <td>
                                nhoi
                            </td>
                        </tr>
                    </table>
                </div>
                <Sidebar></Sidebar>
                <Footer></Footer>
            </>
        );
    }
}

export default AccountManager;