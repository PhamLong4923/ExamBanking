// actions.js
export const SET_TOKEN = 'SET_TOKEN';
export const SET_BANK_TYPE = 'SET_BANK_TYPE';
export const SET_BANK_ID = 'SET_BANK_ID';
export const SET_REPO_ID = 'SET_REPO_ID';

export const SET_EX_BANKTYPE = 'SET_EX_BANKTYPE';
export const SET_EX_BANK = 'SET_EX_BANK';



export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

export const setBankType = (bankType) => ({
    type: SET_BANK_TYPE,
    payload: bankType,
});

export const setBankId = (bankId) => ({
    type: SET_BANK_ID,
    payload: bankId,
});

export const setRepoId = (repoId) => ({
    type: SET_REPO_ID,
    payload: repoId,
});


export const setExBankType = (token) => ({
    type: SET_EX_BANKTYPE,
    payload: token,
});


export const setExBank = (token) => ({
    type: SET_EX_BANK,
    payload: token,
});
