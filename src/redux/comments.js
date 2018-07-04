import {GET_COMMENTS, EDIT_COMMENT, DELETE_COMMENT} from '../constants/actionTypes'
//
// const defaultStore = {
//     comments: []
// };
//
// export default (state = defaultStore, action) => {
//     const {
//         type,
//         payload
//     } = action;
//
//     switch (type) {
// case GET_COMMENTS:
//     return {
//         ...state,
//         comments: [...payload]
//     };

// case ADD_COMMENT:
//     return {
//         ...state,
//         comments: [...state.comments, ...[payload]] // add new comment to other
//     };
//     return {
//         ...state,
//         posts: [...posts] // add new comment to other
//     };


// case EDIT_COMMENT:
//     var tempArr = [...state.comments];
//     for (let i = 0; i< tempArr.length; i++){
//         if (tempArr[i]._id === payload._id){
//             tempArr[i] = payload;
//         }
//     }
//     return {
//         ...state,
//         comments: [...tempArr]
//     };
// case DELETE_COMMENT:
//     return {
//         ...state,
//         comments: state.comments.filter((el) => {
//             return el._id != payload._id
//         })
//     };
//
//         default:
//             return state;
//     }
// }