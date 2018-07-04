import {SET_USERS, DELETE_USERS, CHANGE_LOGIN, UPDATE_USER, ADD_USER} from '../constants/actionTypes'

const defaultStore = {
    items: [],
    currentUser: {},
    updateUser: {}
};

export default (state = defaultStore, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case SET_USERS:
            return {
                ...state,
                items: [...payload]
            };
        case ADD_USER:
            return {
                ...state,
                items: [...state.items, {...payload}]
            };
        case CHANGE_LOGIN:
            return {
                ...state,
                currentUser: {...payload.user}
            };
        case DELETE_USERS:
            return {
                ...state,
                items: state.items.filter((el) => {
                    return el._id !== payload
                })
            };
        case UPDATE_USER:
            return {
                ...state,
                currentUser: {...payload}
            };

        default:
            return state;
    }
}