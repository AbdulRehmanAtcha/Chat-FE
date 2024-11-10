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
                    credentials: "include",
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
                    credentials: "include",
                    body: { email, password }
                })
            }
        }),
        verify: builder.mutation({
            query: () => ({
                url: '/auth/verify',
                credentials: "include",
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation({
            query: ({ firstName, lastName, color }) => {
                return ({
                    url: "/auth/update-profile",
                    method: "PUT",
                    credentials: "include",
                    body: { firstName, lastName, color }
                })
            }
        }),
        updatePicture: builder.mutation({
            query: ({ image }) => {
                const formData = new FormData();
                formData.append("profileImg", image)
                return ({
                    url: "/auth/update-picture",
                    method: "PUT",
                    credentials: "include",
                    body: formData
                })
            }
        }),
        deletePicture: builder.mutation({
            query: ({ imgUrl }) => {

                return ({
                    url: "/auth/remove-image",
                    method: "DELETE",
                    credentials: "include",
                    body: { imgUrl: imgUrl }
                })
            }
        }),
        logout: builder.mutation({
            query: () => {

                return ({
                    url: "/auth/logout",
                    method: "PUT",
                    credentials: "include",
                })
            }
        }),
    })
})


export const { useRegisterMutation, useLoginMutation, useVerifyMutation, useUpdateProfileMutation, useUpdatePictureMutation, useDeletePictureMutation, useLogoutMutation } = authApi