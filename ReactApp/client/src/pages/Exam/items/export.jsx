import React, { useState } from 'react';

const Export = () => {

    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            {/* <CKEditor
                editor={Editor}
                data={editorData}
                onChange={handleEditorChange}
            /> */}
        </div>
    )
}

export default Export;