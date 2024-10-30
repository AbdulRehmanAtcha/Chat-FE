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
        updateProfile: builder.mutation({
            query: ({ firstName, lastName, color }) => {
                return ({
                    url: "/auth/update-profile",
                    method: "PUT",
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
                    body: formData
                })
            }
        }),
        deletePicture: builder.mutation({
            query: ({ imgUrl }) => {

                return ({
                    url: "/auth/remove-image",
                    method: "DELETE",
                    body: { imgUrl: imgUrl }
                })
            }
        }),
    })
})


export const { useRegisterMutation, useLoginMutation, useVerifyMutation, useUpdateProfileMutation, useUpdatePictureMutation, useDeletePictureMutation } = authApi