// apiService.js
import { BASE_URL } from '@/utils/BASE_URL';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GeneralApis = createApi({
    reducerPath : 'generalQueries',
  baseQuery: fetchBaseQuery({ baseUrl:BASE_URL }), 
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/categories`,
    }),
    getSubCategories: builder.query({
      query: () => `/sub_categories`,
    }),
    getStadium: builder.query({
      query: () => `/stadium`,
    }),
    getEvent: builder.query({
      query: () => `/event`,
    }),
    getCountry: builder.query({
      query: () => `/country`,
    }),
    getState: builder.query({
      query: () => `/state`,
    }),
    getCity: builder.query({
      query: () => `/city`,
    }),
    getTickets: builder.query({
      query: () => `/tickets`,
    }),
   
  }),
});

// Export hooks for each endpoint for use in components
export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetStadiumQuery,
  useGetEventQuery,
  useGetCountryQuery,
  useGetStateQuery,
  useGetCityQuery,
  useGetTicketsQuery,
} = GeneralApis;

export default GeneralApis;