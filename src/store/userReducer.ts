import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  addresses: any,
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addresses: []
} as UserInfo;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.addresses = action.payload.addresses;
    },
    addNewAddress: (state, action: PayloadAction<any>) => {
      state.addresses = [...state.addresses, action.payload]
    }
  }
})

export const {setUserData, addNewAddress} = userSlice.actions

export const userSelector = (state: any) => state.user