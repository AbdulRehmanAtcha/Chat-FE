import { createSlice } from "@reduxjs/toolkit";
import { selectUser } from "./auth";


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
            // console.log(action.payload)
            state.selectedChatMessages = action.payload
        },
        closeChat: (state, action) => {
            state.selectedChatType = null
            state.selectedChatData = null
            state.selectedChatMessages = []
        },
        addMessage: (state, action) => {
            if (
                (state.selectedChatType !== null &&
                    (state.selectedChatData?._id === action.payload.recipient?._id ||
                        state.selectedChatData?._id === action.payload.sender?._id)) ||
                (state.selectedChatType !== null &&
                    state.selectedChatData?._id === action.payload?.channelId)
            ) {
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
            // console.log(channel)
            state.channels = [channel, ...state.channels];
        },

        addChannelInChannelList: (state, action) => {
            const channels = state.channels
            const data = channels.find(channel => channel?._id === action.payload?.channelId)
            const index = channels.findIndex(channel => channel?._id === action.payload?.channelId)

            if (index !== -1 && index !== undefined) {
                channels.splice(index, 1)
                channels.unshift(data)
            }
        },

        addContactInDmList: (state, action) => {
            const userId = state.auth.user?._id;
            const fromId = action.payload?.sender?._id === userId ? action.payload?.recipient?._id : action.payload?.sender?._id;
            const formData = action.payload?._id === userId ? action.payload?.recipient : action.payload?.sender;

            const dmContacts = state.dmContacts;
            const data = dmContacts.find((contact) => contact?._id === fromId);
            const index = dmContacts.findIndex((contact) => contact?._id === fromId);

            if (index !== -1) {
                // Move the found contact to the beginning
                dmContacts.splice(index, 1);
                dmContacts.unshift(data);
            } else {
                // Add the new contact to the beginning of the list
                dmContacts.unshift(formData);
            }
        },


    }
})

export const { setSelectedChatData, setSelectedChatMessages, setSelectedChatType, closeChat, addMessage, setdmContacts, setChannels, addChannel, addChannelInChannelList, addContactInDmList } = slice.actions

export default slice.reducer;