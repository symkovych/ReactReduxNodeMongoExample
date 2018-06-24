import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from '../constants/actionTypes'


export const addComment = (data) => {
    return (dispatch) => {
        fetch('/comments/create', {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
                    type: ADD_COMMENT,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const deleteComment = (data) => {
    return (dispatch) => {
        fetch('/comments/delete', {
            method:'DELETE',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
                    type: DELETE_COMMENT,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const editComment = (data) => {
    return (dispatch) => {
        fetch('/comments/update', {
            method:'PATCH',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
                    type: EDIT_COMMENT,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

