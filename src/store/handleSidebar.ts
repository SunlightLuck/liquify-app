import { createSlice } from '@reduxjs/toolkit';

export const handleSidebar = createSlice({
  name: 'handleSidebar',
  initialState: {
    value: false,
    pageName: '',
  },
  reducers: {
    reverseVisible: (state) => {
      state.value = !state.value
    },
    setVisible: (state, action) => {
      state.value = action.payload
    },
    setPageName: (state, action) => {
      state.pageName = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVisible, reverseVisible, setPageName } = handleSidebar.actions

export default handleSidebar.reducer