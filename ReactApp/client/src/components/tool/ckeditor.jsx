import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const Ckeditor = ({ title, dataOnChange, editorId, cdata }) => {


    const handleEditorChange = async (event, editor) => {
        const data = editor.getData();
        dataOnChange(data);
    };

    return (
        <div>
            <h4>{title}</h4>
            <CKEditor
                id={editorId}
                editor={Editor.Editor}
                data={cdata}
                onChange={handleEditorChange}
            />
            <br />
        </div>
    );
};

export default Ckeditor;
