// geographySlice.js
import { BASE_URL } from '@/utils/BASE_URL';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchCountries = createAsyncThunk(
  'geography/fetchCountries',
  async () => {
    const response = await fetch(`${BASE_URL}/country`);
    const data = await response.json();
    return data.countries;
  }
);

export const fetchStates = createAsyncThunk(
  'geography/fetchStates',
  async () => {
    const response = await fetch(`${BASE_URL}/state`);
    const data = await response.json();
    return data.state;
  }
);

export const fetchCities = createAsyncThunk(
  'geography/fetchCities',
  async () => {
    const response = await fetch(`${BASE_URL}/city`);
    const data = await response.json();
    return data.city;
  }
);

// Slice
const geographicalQueriesSlice = createSlice({
  name: 'geography',
  initialState: {
    countries: [],
    states: [],
    cities: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle fetchCountries
      .addCase(fetchCountries.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.countries = null;
      })

      // Handle fetchStates
      .addCase(fetchStates.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.states = null;
      })

      // Handle fetchCities
      .addCase(fetchCities.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.cities = null;
      });
  }
});

export default geographicalQueriesSlice.reducer;

// Selectors
export const selectCountryById = (state, countryId) => {
  console.log(countryId)
  if(state.geography.status === 'succeeded'){
  return state.geography.countries.find(country => country.id === countryId)
}else {
  return null;
}
}
   

export const selectStateById = (state, stateId) => {
  if(state.geography.status === 'succeeded'){
    return state.geography.states.find(state => state.id === stateId) ;
  }else {
    return null;
  }
} 
  

export const selectCityById = (state, cityId) =>  {
  if(state.geography.status === 'succeeded'){
    return state.geography.cities.find(city => city.id === cityId) ;
  }else {
    return null;
  }
}
  
