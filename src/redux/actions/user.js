export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';

export const setUserData = (user) => ({
  type: SET_USER,
  user,
});

export const removeUserData = (user) => ({
  type: REMOVE_USER,
  user,
});

export const setActiveUser = (user) => ({
  type: SET_ACTIVE_USER,
  user,
});
