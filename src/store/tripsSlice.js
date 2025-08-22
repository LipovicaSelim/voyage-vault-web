import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    list: [],
    activeTrip: null,
  },
  reducers: {
    addTrip: (state, action) => {
      state.list.push(action.payload);
    },
    setTrips(state, action) {
      state.list = action.payload;
      state.activeTrip = action.payload[action.payload.length - 1] || null;
    },
    setActiveTrip(state, action) {
      state.activeTrip = action.payload;
    },
  },
});

export const { addTrip, setTrips, setActiveTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
