import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/firebase/auth';
import toast from 'react-hot-toast';

const initialState = {
    userInfo: {
        user: {
            displayName: null,
            email: null,
            photoURL: null,
            uid: null,
            emailVerified: false,
        },
        authStatus: false,
        signupStatus: false
    },
};

// 🚀 Async Thunks
export const emailSignup = createAsyncThunk(
    'auth/emailSignup',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            await authService.Signup({ email, password, name });
            toast.success("Signup SuccessFully")
            return true; // signupStatus = true
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const passwordReset = createAsyncThunk(
    'auth/passwordReset',
    async ({ email }, { rejectWithValue }) => {
        try {
            await authService.changePassword({ email });
            toast.success("Email are sent SuccessFully to Reset Password")
            return true; // signupStatus = true
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const emailLogin = createAsyncThunk(
    'auth/emailLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await authService.LoginEmailAndPassword({ email, password });
            ( !user && toast.error("Login Failed"))
            return user;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.LoginGoogle();
            ( !user && toast.error("Login Failed"))
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const githubLogin = createAsyncThunk(
    'auth/githubLogin',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.LoginGithub();
            ( !user && toast.error("Login Failed"))
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.Logout();
            toast.success("Logout SuccessFully")
            return false; // authStatus = false
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async (_, { rejectWithValue }) => {
        try {
            await authService.deleteUser();
            toast.success("Deleted SuccessFully")
            return false; // Reset authStatus & signupStatus
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const emailVerify = createAsyncThunk(
    'auth/emailVerify',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.emailVerification();
            toast.success("Email Verified")
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const UserAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}, // No async functions here!
    extraReducers: (builder) => {
        builder
            // ✅ Email Signup
            .addCase(emailSignup.fulfilled, (state) => {
                state.userInfo.signupStatus = true;
                state.userInfo.authStatus = false;
            })
            // ✅ Password Reset
            .addCase(passwordReset.fulfilled, () => {
                toast.success("Check Your Mail");
            })
            // ✅ Email Login
            .addCase(emailLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo.authStatus = true;
                    toast.success("Login SuccessFully")
                }
                state.userInfo.user = action.payload;
                state.userInfo.signupStatus = true;
            })
            // ✅ Google Login
            .addCase(googleLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo.authStatus = true;
                    toast.success("Login SuccessFully")
                }
                state.userInfo.user = action.payload;
                state.userInfo.signupStatus = true;
            })
            // ✅ GitHub Login
            .addCase(githubLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo.authStatus = true;
                    toast.success("Login SuccessFully")
                }
                state.userInfo.user = action.payload;
                state.userInfo.signupStatus = true;
            })
            // ✅ Logout
            .addCase(logout.fulfilled, (state) => {
                state.userInfo.authStatus = false;
                state.userInfo.user = initialState.userInfo.user;
            })
            // ✅ Delete User
            .addCase(deleteUser.fulfilled, (state) => {
                state.userInfo.authStatus = false;
                state.userInfo.signupStatus = false;
                state.userInfo.user = initialState.userInfo.user;
            })
            // ✅ Email Verification
            .addCase(emailVerify.fulfilled, (state, action) => {
                state.userInfo.user = action.payload;
            })
    }
});

export default UserAuthSlice.reducer;
