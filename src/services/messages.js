import { api } from "./rtk";

export const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.mutation({
            query: ({
                user2
            }) => {
                return ({
                    url: "/messages/get-messages",
                    method: "POST",
                    body: { user2 },
                    credentials: "include"
                })
            }
        }),
        getChannelMessages: builder.mutation({
            query: ({ channelId }) => {
                return {
                    url: `/channel/channel-messages?channelId=${channelId}`, // Append query parameter directly to URL
                    method: "GET",
                    credentials: "include"
                };
            }
        }),
    })
})


export const { useGetMessagesMutation, useGetChannelMessagesMutation } = messageApi