import Api from "@/lib/axios.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: { pending: false, data: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth") as string) : null, error: null },
}

interface signUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface loginData {
    email: string;
    password: string;
}


export const signup = createAsyncThunk(
    "auth/signup",
    async (data:signUpData , thunkAPI) => {
        try {
            const response = await Api.post("/auth/create", data)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (data:loginData, thunkAPI) => {
        try {
            const response = await Api.post("/auth/login", data)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const authSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        logout : (state)=>{
            state.auth.data = null
            localStorage.removeItem("auth")
            localStorage.removeItem("authTiming")
        },
    },
    extraReducers: (builder) => {
        builder

        // Signup Cases
        .addCase(signup.pending, (state) => {
            state.auth.pending = true
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.auth.data = action.payload
            state.auth.error = null
            localStorage.setItem("auth", JSON.stringify(action.payload.data?.user))
            state.auth.pending = false
        })
        .addCase(signup.rejected, (state,) => {
            state.auth.pending = false
        })

        // Login Cases
        .addCase(login.pending, (state) => {
            state.auth.pending = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.auth.pending = false
            state.auth.data = action.payload
            state.auth.error = null
            localStorage.setItem("auth", JSON.stringify(action.payload.data?.user))
        })
        .addCase(login.rejected, (state,) => {
            state.auth.pending = false
        })
    }
});

export const {logout,} = authSlice.actions
export default authSlice.reducer