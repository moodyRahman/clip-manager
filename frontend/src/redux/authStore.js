import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn: false,
    confirmed: false,
    username: "",
    verification: "unverified"
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        successRegister: (state, action) => {
            const { username, verification } = action.payload
            state.username = username
            state.verification = verification
        },
        successConfirm: (state, action) => {
            state.confirmed = true
            state.isLoggedIn = true
        },
        successLogin: (state, action) => {
            state.username = action.payload
            state.confirmed = true
            state.isLoggedIn = true
        }
    },
})

export const { successConfirm, successLogin, successRegister } = authSlice.actions
export default authSlice.reducer
