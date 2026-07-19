import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {

        isAuthenticated: false,
        loading: true, // App starts in loading state while checking credentials
        userData: null,
        otherUsers: null,
        selectedUser: null,
        onlineUsers : []
    },
    
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.loading = false; // Successfully authenticated, stop loading
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload
        },
        // Action to manually toggle loading state (e.g., if auth check fails or starts)
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLogout: (state) => {
            state.userData = null;
            state.otherUsers = null;
            state.selectedUser = null;
            state.onlineUsers = [];
            state.isAuthenticated = false;
            state.loading = false;
        }
    }
});

export default userSlice.reducer;
export const { 
    setUserData, 
    setOtherUsers, 
    setSelectedUser,
    setOnlineUsers,
    setLoading , setLogout
} = userSlice.actions;

