
import React from 'react';

const ConvertTextTagToHTML = ({ htmlContent }) => {

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ConvertTextTagToHTML;
