import React, { useEffect, useState } from 'react';
import Ckeditor from '../../../components/tool/ckeditor';

const Export = () => {
    const [editorData, setEditorData] = useState('Đây là tex');

    const uppercaseLetters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    // Tạo dữ liệu mẫu chứa câu hỏi và các câu trả lời
    const initialData =
        `
        <p><strong>Câu 1</strong>: Đây là nội dung câu 1</p>
        <p><strong>A</strong>. Đáp án a</p>
        <p><strong>B</strong>. Đáp án b</p>
        <p><strong>C</strong>. Đáp án c</p>
        <p><strong>D</strong>. Đáp án d</p>


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
            <div>
                {editorData}
            </div>
        </div>
    );
};

export default Export;
