// redux/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../libs/axios'; // Adjust the path to your axios instance
import { AxiosError } from 'axios';
import { setToken } from './authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<
  string, // Return type (token)
  LoginCredentials, // Argument type
  { rejectValue: string }
>('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    const token: string = response.data.token;

    // Save token to Redux store
    dispatch(setToken(token));

    return token;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const message =
      (axiosError.response?.data as { message?: string })?.message || 'Login failed. Please try again.';
    return rejectWithValue(message);
  }
});

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: string; // 'admin' | 'user' | etc.
  }
  
  export const register = createAsyncThunk<
    string, // Return type (token)
    RegisterCredentials, // Argument type
    { rejectValue: string }
  >('auth/register', async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const token: string = response.data.token;
  
      // Save token to Redux store
      dispatch(setToken(token));
  
      return token;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const message =
        (axiosError.response?.data as { message?: string })?.message || 'Registration failed. Please try again.';
      return rejectWithValue(message);
    }
  });
  
