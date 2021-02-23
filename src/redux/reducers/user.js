import {SET_USER, REMOVE_USER, SET_ACTIVE_USER} from '../actions/user';

const initialState = {
  users: [],
  activeUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };

    case REMOVE_USER:
      return {
        ...state,
        users: [...state.users, action],
      };

    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
