import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import URL from "../getUrl";

const initialState = {
  user: {},
  login: false,
  isLoading: true,
  isError: false,
  searchFriend: [],
};


// ✅ Get logged-in user using cookie
export const fetchUser = createAsyncThunk("fetchuser", async () => {
  const res = await fetch(
    `${URL}/api/users/loggedInUser`,
    {
      method: "GET",
      credentials: "include", // 🔥 MUST
      headers:{
        'content-type': 'application/json'
      }
    },
  
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
});


export const AuthSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.login = false;
      state.user = {};
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      if (action.payload) {
        state.user = action.payload;
        state.login=true
      } else {
        state.user = {};
        state.login = false;
      }
    });
  },

  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },

    loginUser: (state, action) => {
      // ✅ No localStorage anymore
      state.login = true;
    },

    logoutUser: (state) => {
      state.login = false;
      state.user = {};
    },

    searchFriend: (state, action) => {
      state.searchFriend = action.payload;
    },
  },
});

export const {
  updateUser,
  loginUser,
  logoutUser,
  searchFriend,
} = AuthSlice.actions;

export default AuthSlice.reducer;