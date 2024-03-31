import React from "react";
import { Breadcrumb } from "antd";
import { useDispatch } from "react-redux";
import { setBankId, setBankType, setRepoId } from "../../redux-setup/action";

const MyBreadCrumb = ({ path }) => {
    const dispatch = useDispatch();

    const handlePathSelect = (index) => {
        if (index <= 1) {
            dispatch(setBankType(null));
        }
        if (index <= 2) {
            dispatch(setBankId(null));
        }
        if (index <= 3) {
            dispatch(setRepoId(null));
        }
    }

    const renderBreadcrumbItems = () => {
        const breadcrumbItems = [];

        if (path >= 1) {
            breadcrumbItems.push(
                <Breadcrumb.Item key="bank" onClick={() => handlePathSelect(1)}>Ngân hàng</Breadcrumb.Item>,
                <Breadcrumb.Item key="subject">Môn học</Breadcrumb.Item>
            );
        }
        if (path >= 2) {
            breadcrumbItems.pop();
            breadcrumbItems.push(
                <Breadcrumb.Item key="subject" onClick={() => handlePathSelect(2)}>Môn học</Breadcrumb.Item>,
                <Breadcrumb.Item key="chapter">Chương</Breadcrumb.Item>
            );
        }
        if (path >= 3) {
            breadcrumbItems.pop();
            breadcrumbItems.push(
                <Breadcrumb.Item key="chapter" onClick={() => handlePathSelect(3)}>Chương</Breadcrumb.Item>,
                <Breadcrumb.Item key="questions">Bài và Câu hỏi</Breadcrumb.Item>
            );
        }

        return breadcrumbItems;
    }

    return (
        <Breadcrumb style={{ marginBottom: '16px', cursor: 'pointer' }}>
            {renderBreadcrumbItems()}
        </Breadcrumb>
    );
}

export default MyBreadCrumb;
