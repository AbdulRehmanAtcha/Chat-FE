import { api } from "./rtk";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({
                email,
                password
            }) => {
                return ({
                    url: "/auth/signup",
                    method: "POST",
                    body: { email, password }
                })
            }
        }),
        login: builder.mutation({
            query: ({
                email,
                password
            }) => {
                return ({
                    url: "/auth/login",
                    method: "POST",
                    body: { email, password }
                })
            }
        }),
        verify: builder.mutation({
            query: () => ({
                url: '/auth/verify',
                method: 'GET',
            }),
        }),
    })
})


export const { useRegisterMutation, useLoginMutation, useVerifyMutation } = authApi