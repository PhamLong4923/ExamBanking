import React, { useEffect, useState } from 'react';
import Ckeditor from '../../../components/tool/ckeditor';

const Export = ({ qdata }) => {
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        // Function to generate answers with uppercase letters
        const generateAnswers = (answers) => {
            const formattedAnswers = answers.map((answer, index) => `<p><strong>${uppercaseLetters[index]}</strong>. ${answer}</p>`);
            return formattedAnswers.join('\n');
        };

        // Function to generate question content and answers
        const generateQuestionData = (question) => {
            let questionContent = `<p><strong>${question.quescontent}</strong></p>`;
            if (question.type === 0) { // Multiple choice question
                if (question.ans) { // If answer exists
                    const answers = generateAnswers(question.ans);
                    questionContent += answers;
                }
            }
            return questionContent;
        };

        // Generate CKEditor data for each question
        const editorContent = qdata.map(question => generateQuestionData(question)).join('\n');

        setEditorData(editorContent);
    }, [qdata]);

    const uppercaseLetters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    return (
        <div>
            <Ckeditor
                editorId={'export'}
                cdata={editorData}
                dataOnChange={setEditorData}
            />
        </div>
    );
};

export default Export;
