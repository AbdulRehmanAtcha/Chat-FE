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
    })
})


export const { useGetMessagesMutation } = messageApi