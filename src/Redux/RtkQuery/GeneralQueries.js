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
      query: () => `/staduim`,
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
    getTicketsByEvent: builder.query({
            query: () => `/tickets`,
            transformResponse: (response, meta, arg) => {
                // Filter tickets based on event_id
                return {
                    ...response,
                    tickets: response.tickets.filter(ticket => ticket.event_id === arg),
                };
            },
        }),
        getStadiumById: builder.query({
          query: () => `/staduim`, // Fetching the entire list of stadiums
          transformResponse: (response, meta, arg) => {
              // Assuming the response is an array of stadiums
              // Filter the array to find the stadium with the given ID
              return response.staduim.find(stadium => stadium.id === arg);
          },
      }),
    getEventsBySubCategory: builder.query({
      query: () => `/event`,
      transformResponse: (response, meta, arg) => ({
          ...response,
          events: transformEventsBySubCategory(response, arg.subCategoryId),
      }),
  }),
  getEventsByCategory: builder.query({
      query: () => `/event`,
      transformResponse: (response, meta, arg) => ({
          ...response,
          events: transformEventsByCategory(response, arg.categoryId),
      }),
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
  useGetTicketsByEventQuery,
  useGetCityQuery,
  useGetTicketsQuery,
  useGetEventsBySubCategoryQuery,
  useGetEventsByCategoryQuery,
  useGetStadiumByIdQuery
} = GeneralApis;

export default GeneralApis;

const transformEventsBySubCategory = (response, subCategoryId) => {
  return response.events.filter(event => event.sub_category_id === subCategoryId);
};

const transformEventsByCategory = (response, categoryId) => {
  return response.events.filter(event => event.category_id === categoryId);
};