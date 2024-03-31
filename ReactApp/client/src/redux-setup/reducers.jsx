// reducers.js
import { combineReducers } from 'redux';
import { SET_TOKEN, SET_BANK_TYPE, SET_BANK_ID, SET_REPO_ID, SET_EX_BANK, SET_EX_BANKTYPE } from '../redux-setup/action.jsx';

const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

const bankTypeReducer = (state = null, action) => {
    switch (action.type) {
        case SET_BANK_TYPE:
            return action.payload;
        default:
            return state;
    }
};

const bankIdReducer = (state = null, action) => {
    switch (action.type) {
        case SET_BANK_ID:
            return action.payload;
        default:
            return state;
    }
};

const repoIdReducer = (state = null, action) => {
    switch (action.type) {
        case SET_REPO_ID:
            return action.payload;
        default:
            return state;
    }
};

const exBankTypeReducer = (state = null, action) => {
    switch (action.type) {
        case SET_EX_BANKTYPE:
            return action.payload;
        default:
            return state;
    }
};

const exBankReducer = (state = null, action) => {
    switch (action.type) {
        case SET_EX_BANK:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    token: tokenReducer,
    bankType: bankTypeReducer,
    bankId: bankIdReducer,
    repoId: repoIdReducer,
    exBank: exBankReducer,
    exBankType: exBankTypeReducer,
});

export default rootReducer;
