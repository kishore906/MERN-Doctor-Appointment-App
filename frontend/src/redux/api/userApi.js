import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //dispatch(setUser(data.user)); // write in this way if we don't use transformResponse property
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    uploadPhoto: builder.mutation({
      query(body) {
        return {
          url: "/me/upload_photo",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/me/updatePassword",
          method: "PUT",
          body,
        };
      },
    }),

    deleteUser: builder.mutation({
      query() {
        return {
          url: `/me`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useUploadPhotoMutation,
} = userApi;
