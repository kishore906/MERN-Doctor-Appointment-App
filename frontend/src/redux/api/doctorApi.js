import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => "/alldoctors",
    }),

    getDoctor: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: ["Doctor"],
    }),

    getDoctorsByProfession: builder.mutation({
      query(body) {
        return {
          url: "/doctors",
          method: "POST",
          body,
        };
      },
    }),

    canUserReview: builder.query({
      query: (doctorId) => `/canUserReview?doctorId=${doctorId}`,
    }),

    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useGetDoctorsByProfessionMutation,
  useGetDoctorQuery,
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} = doctorApi;
