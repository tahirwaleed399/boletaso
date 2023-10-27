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
export const selectSubCategoriesByCategoryId = (state, categoryId) => 
  state.categories.subCategories.filter(subCategory => subCategory.category.id === categoryId);
