import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "6dc8466bfd2e4353ab0222124252106";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: apiKey,
          q: city,
          days: 3,
        },
      }
    );
    const daily = response.data.forecast.forecastday.map((day) => ({
      weatherIcon: day.day.condition.icon,
      weatherTem: Math.round(day.day.avgtemp_c),
      weekDay: new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
    }));
    return { city, daily };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {}, // { [city]: daily }
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data[action.payload.city] = action.payload.daily;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
