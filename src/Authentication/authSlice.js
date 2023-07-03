import { createSlice } from '@reduxjs/toolkit'

const authSliceState = {
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authSliceState,
    reducers: {
        isAuth: (state) => {
            state.isAuth = true
        },
        logOut: (state) => {
            return authSliceState;
            // state.isAuth = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { isAuth, logOut } = authSlice.actions

export default authSlice.reducer