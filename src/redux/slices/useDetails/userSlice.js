import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: null,
    fcmToken: null,
    isFirstLogin: true,
    currentLanguage: 'en',
    name: '',
    sessionToken: null,
    isPremium: false,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action?.payload;
    },

    setUserName: (state, action) => {
      state.userDetails.fullname = action?.payload;
    },
    setUserEmail: (state, action) => {
      state.userDetails.email = action?.payload;
    },
    setProfilePicture: (state, action) => {
      state.userDetails.profile_pic =
        action?.payload + '&' + 'test=12' + new Date().getTime();
    },
    setIsFirstLogin: (state, action) => {
      state.isFirstLogin = action?.payload;
    },
    _setSelectedLanguage: (state, action) => {
      state.currentLanguage = action?.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action?.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action?.payload;
    },
    setIsPremium: (state, action) => {
      state.isPremium = action?.payload;
    },
  },
});

export const {
  setUserDetails,
  setIsFirstLogin,
  _setSelectedLanguage,
  setFcmToken,
  setSessionToken,
  setIsPremium,
  setProfilePicture,
  setUserName,
  setUserEmail,
} = userSlice.actions;
export default userSlice.reducer;
