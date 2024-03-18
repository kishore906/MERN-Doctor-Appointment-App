import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => "/myAppointments",
      providesTags: ["Appointments"],
    }),

    bookAppointment: builder.mutation({
      query(body) {
        return {
          url: "/bookAppointment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const { useGetAppointmentsQuery, useBookAppointmentMutation } =
  appointmentApi;
