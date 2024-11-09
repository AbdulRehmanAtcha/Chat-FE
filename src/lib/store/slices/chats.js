import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedChatType: null,
    selectedChatData: null,
    selectedChatMessages: [],
    dmContacts: [],
    channels: [],
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
        addMessage: (state, action) => {
            if (state.selectedChatType !== null && (state.selectedChatData._id === action.payload.recipient._id || state.selectedChatData._id === action.payload.sender._id)) {
                const recipient = state.selectedChatType === "channel"
                    ? action.payload.recipient
                    : action.payload.recipient._id;

                const sender = state.selectedChatType === "channel"
                    ? action.payload.sender
                    : action.payload.sender._id;

                state.selectedChatMessages.push({
                    ...action.payload,
                    recipient,
                    sender
                });
            }
        },
        setdmContacts: (state, action) => {
            state.dmContacts = action.payload
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        addChannel: (state, action) => {
            const channel = action.payload;
            console.log(channel)
            state.channels = [channel, ...state.channels];
        },

    }
})

export const { setSelectedChatData, setSelectedChatMessages, setSelectedChatType, closeChat, addMessage, setdmContacts, setChannels, addChannel } = slice.actions

export default slice.reducer;