import React from "react";
import { useSelector } from "react-redux";
import BankType from "./items/banktype";
import Bank from "./items/banks";
import Repo from "./items/repo"
import Section from "./items/section";

const BankPage = () => {
    const bankType = useSelector(state => state.bankType);
    const bankId = useSelector(state => state.bankId);
    const repoId = useSelector(state => state.repoId);

    let renderedComponent;

    if (bankType !== null) {
        renderedComponent = <Bank />;
    } else {
        renderedComponent = <BankType />;
    }
    if (bankId !== null) {
        renderedComponent = <Repo />;
    }
    if (repoId !== null) {
        renderedComponent = <Section />;
    }

    return renderedComponent;
}

export default BankPage;
