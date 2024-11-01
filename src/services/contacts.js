import { api } from "./rtk";

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        searchContacts: builder.mutation({
            query: ({
                searchTerm
            }) => {
                return ({
                    url: "/contacts/search",
                    method: "POST",
                    body: { searchTerm },
                    credentials: "include"
                })
            }
        }),
    })
})


export const { useSearchContactsMutation } = contactApi