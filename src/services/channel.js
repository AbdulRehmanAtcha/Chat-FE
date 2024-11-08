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
    })
})

export const { useAddChannelMutation} = channelApi