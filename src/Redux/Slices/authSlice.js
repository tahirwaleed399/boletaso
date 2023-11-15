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
      localStorage.setItem('user' , JSON.stringify(data.student))
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
      localStorage.setItem('user' , JSON.stringify(data.student))
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchUser = createAsyncThunk(
  'auth/fetchuser',
  async ({} , thunkAPI) => {
    try {
      let data =  JSON.parse(localStorage.getItem('user'));
      console.log(data)
      if(!data)   return thunkAPI.rejectWithValue(data);
   
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
  reducers: {

    resetState: (state) => {
      return {
        user: null,
        isLoading: false,
        error: null,
      };
    },
  },
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
        
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        
        
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;

      })
      .addCase(fetchUser.rejected, (state, action) => {
     
        state.isLoading = false;
        state.error = 'no user';
        state.user = null;
      });
  },
});
export const { resetState } = authSlice.actions;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
