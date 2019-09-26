export const getUsersState = (state) => state.users

export const getUsers = (state) => getUsersState(state).users

export const getById = (state, _id) => getUsers(state)[_id]
