import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "../features/habits/habitsSlice";
import weatherReducer from "../features/weather/weatherSlice";
import quotesReducer from "../features/quotes/quotesSlice";

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    weather: weatherReducer,
    quotes: quotesReducer,
  },
});
