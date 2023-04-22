import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn: false,
    confirmed: false,
    username: "",
    verification: "unverified",
    userID: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        successRegister: (state, action) => {
            state.username = action.payload
            state.verification = "in progress"
        },
        successConfirm: (state, action) => {
            state.confirmed = true
            state.isLoggedIn = true
            state.verification = "verified"
        },
        successLogin: (state, action) => {
            const { username, userID } = action.payload;
            state.username = username
            state.confirmed = true
            state.isLoggedIn = true
            state.userID = userID
        },
        logout: (state, action) => {
            state.username = ""
            state.confirmed = ""
            state.isLoggedIn = false
            state.verification = "unverified"
            state.userId = ""
        }
    },
})

export const { successConfirm, successLogin, successRegister, logout } = authSlice.actions
export default authSlice.reducer
