import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedChatType: null,
    selectedChatData: null,
    selectedChatMessages: []
};

const slice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setSelectedChatType: (state, action) => {
            state.selectedChatType = action.payload
        },
        setSelectedChatData: (state, action) => {
            state.selectedChatData = action.payload
        },
        setSelectedChatMessages: (state, action) => {
            state.selectedChatMessages = action.payload
        },
        closeChat: (state, action) => {
            state.selectedChatType = null
            state.selectedChatData = null
            state.selectedChatMessages = []
        },

    }
})

export const { setSelectedChatData, setSelectedChatMessages, setSelectedChatType, closeChat } = slice.actions

export default slice.reducer;