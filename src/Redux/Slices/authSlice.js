// redux/authSlice.js
import { BASE_URL } from '@/utils/BASE_URL';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Sample Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, onSuccess = () => {} }, thunkAPI) => {
    try {
      const response = await fetch( BASE_URL + '/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if(!data.success) return thunkAPI.rejectWithValue(data);
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }
      onSuccess()
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({credentials, onSuccess = ()=>{}}, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL + '/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      if(!data.success)   return thunkAPI.rejectWithValue(data);
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      onSuccess();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('Login user pending');
        state.isLoading = true;
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login user fullfilled');
        toast.success('Logged In 😀');
        state.isLoading = false;
        state.user = action.payload.student;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login user Rejected');
        toast.error('Logged in failed')
        state.isLoading = false;
        state.error = action.payload;
        state.user =  null;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        
        
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        toast.success('Registered Successfully 🎉');

        state.isLoading = false;
        state.user = action.payload.student;
        state.error = null;

      })
      .addCase(signupUser.rejected, (state, action) => {
        toast.error('Signup failed')
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
