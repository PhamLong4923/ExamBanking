import React, { useEffect, useState } from 'react';
import Ckeditor from '../../../components/tool/ckeditor';

const Export = () => {
    const [editorData, setEditorData] = useState('Đây là tex');

    // Tạo dữ liệu mẫu chứa câu hỏi và các câu trả lời
    const initialData = `
    <div style="display: flex; flex-direction: column;">
    <!-- Câu hỏi -->
    <p><strong>Câu 1:</strong> Đây là câu hỏi của bạn?</p>
    <!-- Câu trả lời -->
    <div style="display: flex; justify-content: space-between;">
        <!-- Cột trái -->
        <div style="flex-basis: 45%;">
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Đáp án A:</strong> Đây là câu trả lời thứ nhất.</li>
                <li><strong>Đáp án B:</strong> Đây là câu trả lời thứ hai.</li>
            </ul>
        </div>
        <!-- Cột phải -->
        <div style="flex-basis: 45%;">
            <ul style="list-style: none; padding-left: 0;">
                <li><strong>Đáp án C:</strong> Đây là câu trả lời thứ ba.</li>
                <li><strong>Đáp án D:</strong> Đây là câu trả lời thứ tư.</li>
            </ul>
        </div>
    </div>
</div>


    `;

    useEffect(() => {
        setEditorData(initialData);
    }, []);


    const handleEditorChange = (data) => {
        setEditorData(data);
    };

    return (
        <div>
            <Ckeditor
                editorId={'export'}
                cdata={editorData} // Sử dụng dữ liệu mẫu nếu không có dữ liệu được cung cấp
                dataOnChange={handleEditorChange}
            />
        </div>
    );
};

export default Export;
