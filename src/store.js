import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./Authentication/authSlice";
import membersSlice from "./components/Members/MembersSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        members: membersSlice,
        
    },
})