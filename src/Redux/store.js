// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { fetchUser } from './Slices/authSlice';
import categoriesReducer, { fetchCategories, fetchSubCategories } from './Slices/categoriesSlice';

import geographyReducer, { fetchCities, fetchCountries, fetchStates  } from './Slices/geographicalQueriesSlice';

import GeneralApis  from './RtkQuery/GeneralQueries';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    geography: geographyReducer,
    categories: categoriesReducer,

    [GeneralApis.reducerPath]: GeneralApis.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(GeneralApis.middleware),
});

store.dispatch(fetchCountries());
store.dispatch(fetchStates());
store.dispatch(fetchCities());
store.dispatch(fetchCategories());
store.dispatch(fetchSubCategories());
store.dispatch(fetchUser({}))



export default store;


