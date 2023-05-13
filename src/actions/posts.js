import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from '../constants/actionTypes'

export const getPosts = () => {
    return (dispatch) => {
        fetch('/posts', {
            method: 'GET',
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
                    type: GET_POSTS,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const addPost = (data) => {
    const {_id} = data;
    const url = _id ? `/posts/${_id}` : '/posts';
    const method = _id ? 'PATCH' : 'POST';
    const ActionType = _id ? 'EDIT_POST' : 'ADD_POST';

    return (dispatch) => {
        fetch(url, {
            method,
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
                    type: ActionType,
                    payload: resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const deletePost = (data) => {
    const {_id} = data;
    return (dispatch) => {
        fetch(`/posts/${_id}`, {
            method: 'DELETE',
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
                    type: DELETE_POST,
                    payload: resp.deleted
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};


