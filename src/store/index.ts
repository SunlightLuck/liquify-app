import { configureStore } from '@reduxjs/toolkit'
import handleSidebar from './handleSidebar';
import { homeSlice } from './homeReducer';
import { userSlice } from './userReducer';

export default configureStore({
  reducer: {
    handleSidebar: handleSidebar,
    user: userSlice.reducer,
    home: homeSlice.reducer
  },
});

