import { BASE_URL } from '@/utils/BASE_URL';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    return data.categories;
  }
);

export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories',
  async () => {
    const response = await fetch(`${BASE_URL}/sub_categories`);
    const data = await response.json();
    return data.sub_categories;
  }
);

// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    subCategories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle fetchCategories
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.categories = [];
      })

      // Handle fetchSubCategories
      .addCase(fetchSubCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.subCategories = [];
      });
  }
});

export default categoriesSlice.reducer;

// Selectors
export const selectSubCategoriesByCategoryId = (state, categoryId) => {
  console.log({state , categoryId});
  
  return state.categories.subCategories.filter(subCategory => subCategory.category.id === categoryId);

}
// Selector to find a category by name (case-insensitive) only if data is fetched
export const selectCategoryByName= (state, title) => {
  if (state.categories.status !== 'succeeded') {
    // Data has not been successfully fetched, return undefined or appropriate value
    return {name : 'loading...' , description : 'loading....'};
  }
  console.log(state)
  // Data is fetched, proceed with the title check
  return state.categories.categories.find(
    category => category.name.toLowerCase() === title.toLowerCase()
  );
};
export const selectSubCategoryByName= (state, title) => {
  if (state.categories.status !== 'succeeded') {
    // Data has not been successfully fetched, return undefined or appropriate value
    return {name : 'loading...' , description : 'loading....'};
  }
  console.log(state)
  // Data is fetched, proceed with the title check
  return state.categories.subCategories.find(
    category => category.name.toLowerCase() === title.toLowerCase()
  );
};

export const selectAllCategories = (state) => state.categories.categories;
export const selectAllSubCategories = (state) => state.categories.subCategories;
