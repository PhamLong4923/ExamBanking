import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExBank from "./items/exbank";
import ExBankType from "./items/exbanktype";
import ExRepo from "./items/exrepo";

const ExamPage = () => {
    const exbanktype = useSelector(state => state.exBankType);
    const exbank = useSelector(state => state.exBank);

    let renderedComponent;

    if (exbanktype !== null) {
        renderedComponent = <ExBank />;
    } else {
        renderedComponent = <ExBankType />
    }
    if (exbank !== null) {
        renderedComponent = <ExRepo />
    }

    return renderedComponent;
}

export default ExamPage;
