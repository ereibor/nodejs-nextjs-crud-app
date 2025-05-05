// redux/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../libs/axios";
import { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersApiResponse {
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const fetchUsers = createAsyncThunk<
  UsersApiResponse,  // full response (not just users)
  number,            // page number argument
  { rejectValue: string }
>("users/fetch", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get<UsersApiResponse>(`/api/users?page=${page}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message =
      (axiosError.response?.data as { message?: string })?.message ||
      "Failed to fetch users";
    return rejectWithValue(message);
  }
});


 interface AddUser {
  name: string;
  email: string;
  role: "user" | "admin"; // or just string if roles are dynamic
  password: string;
}
export const addUser = createAsyncThunk<
  AddUser,                            // Return type (single user)
  Omit<AddUser, "_id">,              // Argument (user input without _id)
  { rejectValue: string }
>("users/add", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<AddUser>("/api/users/users", userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message =
      (axiosError.response?.data as { message?: string })?.message ||
      "Failed to add user";
    return rejectWithValue(message);
  }
});


export const deleteUser = createAsyncThunk<
  string,                // Return type (user ID of deleted user)
  string,                // Argument (user ID to delete)
  { rejectValue: string }
>("users/delete", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/users/users/${userId}`);
    return userId; // Return the ID so we can filter it out in the reducer
  } catch (error) {
    const axiosError = error as AxiosError;
    const message =
      (axiosError.response?.data as { message?: string })?.message ||
      "Failed to delete user";
    return rejectWithValue(message);
  }
});



interface UpdateUser {
  _id: string; // Unique identifier for the user
  name: string;
  email: string;
  role: "user" | "admin";
}

export const updateUser = createAsyncThunk<  // Return type (updated user)
  User,                                  // Argument (user data including _id)
  UpdateUser,                            // Argument (user data with _id)
  { rejectValue: string }
>("users/update", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put<User>(`/api/users/users/${userData._id}`, userData);
    return response.data;  // Return the updated user
  } catch (error) {
    const axiosError = error as AxiosError;
    const message =
      (axiosError.response?.data as { message?: string })?.message ||
      "Failed to update user";
    return rejectWithValue(message);
  }
});
