import {
    CHANGE_LOGIN,
    SET_USERS,
    DELETE_USERS,
    SIGNUP_ERROR,
    UPDATE_USER,
    ADD_USER,
    CREATE_USER_ERR
} from '../constants/actionTypes'


export const deleteUser = (id) => {
    return (dispatch) => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: DELETE_USERS,
                    payload: id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const updateUser = (props) => {
    return (dispatch) => {
        const body = {};
        //check empty value
        for (let key in props) {
            if (props[key]) body[key] = props[key];
        }
        fetch(`/users`, {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                body
            )
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }
                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: UPDATE_USER,
                    payload: resp.updated
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getUsers = () => {
    return (dispatch) => {
        fetch('/users', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token': 'sas'
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: SET_USERS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const logOut = () => {
    return (dispatch) => {
        fetch('/users/logout', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then((resp) => {
                if (resp.ok) {
                    console.log(resp);
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        isLoggedIn: false
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const signUp = ({email, pass}, history) => {
    return (dispatch) => {
        fetch('/users/signUp', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pass
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return history.push('/signIn')
            })
            .catch((err) => {
                const errorOb = err.message;

                dispatch({
                    type: SIGNUP_ERROR,
                    payload: errorOb
                })
            })
    }
};

export const createUser = ({email, pass, name, isAdmin}) => {
    return (dispatch) => {
        fetch('/users', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pass,
                name,
                isAdmin
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }
                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: ADD_USER,
                    payload: resp.data
                })
            })
            .catch((err) => {
                const errorOb = err.message;
                dispatch({
                    type: CREATE_USER_ERR,
                    payload: errorOb
                })
            })
    }
};

export const signIn = ({email, pass}, history) => {
    return (dispatch) => {
        fetch('/users/signIn', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pass
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    console.log(resp);
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                history.push('/');
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: resp
                    }
                })
            })
            .catch((err) => {
                const errorOb = err.message;
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: errorOb
                })
            })
    }
};

export const checkSession = (history) => {
    return (dispatch) => {
        fetch('/users/checkAuthentication?type=text', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return dispatch({
                    type: CHANGE_LOGIN,
                    payload: {
                        user: resp.user,
                        isLoggedIn: true
                    }
                })
            })
            .catch((err) => {
                return history.push('/signIn')
            })
    }
};