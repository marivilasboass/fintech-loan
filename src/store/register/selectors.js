export const getRegister = (state) => state.register

export const getNickname = (state) => getRegister(state).nickname

export const getEmail = (state) => getRegister(state).email

export const getUsername = (state) => getRegister(state).username

export const getPhone = (state) => getRegister(state).phone

export const getPassword = (state) => getRegister(state).password

export const getUserType = (state) => getRegister(state).userType

export const getLoading = (state) => getRegister(state).loading

export const getError = (state) => getRegister(state).error

export const getValid = (state) => getRegister(state).valid

export const getCode = (state) => getRegister(state).code
