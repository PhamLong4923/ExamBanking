// reducers.js
import { combineReducers } from 'redux';
import { SET_TOKEN, SET_BANK_TYPE, SET_BANK_ID, SET_REPO_ID } from '../redux/action.jsx';

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

const rootReducer = combineReducers({
    token: tokenReducer,
    bankType: bankTypeReducer,
    bankId: bankIdReducer,
    repoId: repoIdReducer,
});

export default rootReducer;
