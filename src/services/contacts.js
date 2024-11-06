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
        getDmContacts: builder.mutation({
            query: () => ({
                url: '/contacts/get-contacts-dm',
                credentials: "include",
                method: 'GET',
            }),
        }),
    })
})


export const { useSearchContactsMutation, useGetDmContactsMutation } = contactApi