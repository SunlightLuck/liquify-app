import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface HomeInfo {
  rewards: Number,
  price: Number,
  dayPerformance: Number,
  dailyRelay: Number,
  dailyToken: Number,
  monthRelay: Number,
  monthToken: Number,
  deployedStake: Number,
  deployedTotal: Number,
  deployed: any,
  hourRelays: any,
  isUpdated: Boolean
}

const initialState = {
  rewards: 0,
  price: 0,
  dayPerformance: 0,
  dailyRelay: 0,
  dailyToken: 0,
  monthRelay: 0,
  monthToken: 0,
  deployedStake: 0,
  deployedTotal: 0,
  deployed: [],
  hourRelays: Array(24).fill(0),
  isUpdated: false
} as HomeInfo;

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeData: (state, action: PayloadAction<any>) => {
      state.rewards = action.payload.rewards;
      state.price = action.payload.price;
      state.dayPerformance = action.payload.dayPerformance;
      state.dailyRelay = action.payload.dailyRelay;
      state.dailyToken = action.payload.dailyToken;
      state.monthRelay = action.payload.monthRelay;
      state.monthToken = action.payload.monthToken;
      state.deployedStake = action.payload.deployedStake;
      state.deployedTotal = action.payload.deployedTotal;
      state.hourRelays = action.payload.hourRelays;
      state.isUpdated = true;
    },
    setHomeItem: (state, action: PayloadAction<any>) => {
      const items = Object.keys(action.payload);
      items.forEach(item => {
        state[item] = action.payload[item];
      });
    },
    setHomeChart: (state, action: PayloadAction<any>) => {
      for (let index = action.payload.index; index < state.hourRelays.length; index++) {
        state.hourRelays[index] = action.payload.value 
      }
    },
    addDeploy: (state, action: PayloadAction<any>) => {
      state.deployed[action.payload.index] = action.payload.deploy;
      state.deployedStake += (parseFloat(action.payload.deploy.tokens) / 1000000) as any;
      state.deployedTotal += ((parseFloat(action.payload.deploy.tokens) + action.payload.deploy.balance) /100000) as any;
    },
    setUpdated: (state, action: PayloadAction<any>) => {
      state.isUpdated = action.payload
    }
  }
})

export const {setHomeData, setHomeItem, setHomeChart, setUpdated, addDeploy} = homeSlice.actions

export const homeSelector = (state: any) => state.home