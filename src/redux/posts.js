import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../constants/actionTypes'

const defaultStore = {
  items: []
};

export default (state = defaultStore, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        items: [...payload]
      };

    case ADD_POST:
      return {
        ...state,
        items: [...state.items, ...[payload]] // add new post to other
      };

      case EDIT_POST:
      var tempArr = [...state.items];
      for (let i = 0; i< tempArr.length; i++){
        if (tempArr[i]._id === payload._id){
            tempArr[i].title = payload.title;
            tempArr[i].description= payload.description;
        }
      }
        return {
            ...state,
            items: [...tempArr]
        };
      case DELETE_POST:
           return {
          ...state,
          items: state.items.filter((el) => {
              return el._id !== payload._id
          })
      };
           //comments reducer

      case ADD_COMMENT:
          const postArr = [...state.items];
          for (let i = 0; i< postArr.length; i++){
              if (postArr[i]._id === payload.postId){
                  postArr[i].comments.push(payload);
              }
          }
          return {
              ...state,
              items: [...postArr]
          };
      case EDIT_COMMENT:
          const postArr2 = [...state.items];
          for (let i = 0; i< postArr2.length; i++){
              if (postArr2[i]._id === payload.postId){
                  const index = postArr2[i].comments.findIndex(x => x._id === payload._id );
                  postArr2[i].comments[index] = payload;
              }
          }
          return {
              ...state,
              items: [...postArr2]
          };
      case DELETE_COMMENT:
          const postArr3 = [...state.items];
          const postIndex = postArr3.findIndex(x => x._id === payload.postId );
          const updateComments = postArr3[postIndex].comments.filter(x => {return x._id !== payload._id});
          postArr3[postIndex].comments = updateComments;
          return {
              ...state,
              items: postArr3
          };
    default:
      return state;
  }
}