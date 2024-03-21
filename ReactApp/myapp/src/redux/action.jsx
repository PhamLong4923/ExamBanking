// actions.js
export const SET_TOKEN = 'SET_TOKEN';
export const SET_BANK_TYPE = 'SET_BANK_TYPE';
export const SET_BANK_ID = 'SET_BANK_ID';
export const SET_REPO_ID = 'SET_REPO_ID';

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
