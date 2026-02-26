import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherCodeMap } from "./weatherCode";
// Thunk API call
// Créez une action asynchrone fetchWeather avec createAsyncThunk pour récupérer la météo.
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=33.5731&longitude=-7.5898&current_weather=true",//API OF MOROCCO
    );
    const data = await response.json();
    const info = data.current_weather;
    return {
      temperature: `${info.temperature}°C`,
      daytime: info.is_day ? "Day" : "Night",
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Casablanca",
      }),
      wind: {
        speed: `${info.windspeed} km/h`,
      },
      condition: weatherCodeMap[info.weathercode] || "Unknown",
    };
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: null, // OBJ weather 
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { //Gestion des États (Cycle de vie) 
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload; //store full object
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; //stockage d'erreur
      });
  },
});

export default weatherSlice.reducer;
