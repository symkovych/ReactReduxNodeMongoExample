import {CHANGE_LOGIN, SIGNUP_ERROR, SIGNIN_ERROR, CREATE_USER_ERR} from '../constants/actionTypes'

const defaultStore = {
    isLoggedIn: false,
    errors: {}
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case CHANGE_LOGIN:
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                errors: {}
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                errors: {...payload}
            };
        case SIGNIN_ERROR:
            return {
                ...state,
                errors: {...payload}
            };
        case CREATE_USER_ERR:
            return {
                ...state,
                errors: {...payload}
            };

        default:
            return state;
    }
}