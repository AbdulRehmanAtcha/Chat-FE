import { api } from "./rtk";

export const channelApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addChannel: builder.mutation({
            query: ({
                name, members
            }) => {
                return ({
                    url: "/channel/create-channel",
                    method: "POST",
                    body: { name, members },
                    credentials: "include"
                })
            }
        }),
        getUserChannels: builder.mutation({
            query: () => ({
                url: '/channel/user-channels',
                credentials: "include",
                method: 'GET',
                refetchOnMountOrArgChange: true,
            }),
        }),
    })
})

export const { useAddChannelMutation, useGetUserChannelsMutation } = channelApi