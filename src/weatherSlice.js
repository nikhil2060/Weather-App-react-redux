import { createSlice, isPlainObject } from "@reduxjs/toolkit";
// const API_KEY = "kP9nAbElFDDRrMoufO7IstWF3I23hAPI";
const API_KEY = "uvbAnAXpvGhqny6fb6u2AyxXAZaLDYUl";

const initialState = {
  city: "",
  icon: "",
  weatherText: "",
  temp: 0,
  isDayTime: true,
  windSpeed: 0,
  humidity: 0,
  isLoading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    searchCity(state, action) {
      state.city = action.payload.city;
      state.icon = action.payload.icon;
      state.weatherText = action.payload.text;
      state.temp = action.payload.tempC;
      state.isDayTime = action.payload.isDay;
      state.windSpeed = action.payload.windSpeed;
      state.humidity = action.payload.humidity;
      state.isLoading = false;
    },

    fetchingWeather(state) {
      state.isLoading = true;
    },
  },
});

// export const {} = weatherSlice.actions;

export function searchCity(city) {
  return async function (dispatch) {
    dispatch({ type: "weather/fetchingWeather" });

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff385e307fmshb0858a9da1b6f39p143eecjsn86f0d4d8d604",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (!res) return;

      const city = data.location.name;
      const icon = "https:" + data.current.condition.icon;
      console.log(icon);
      const text = data.current.condition.text;
      const tempC = data.current.temp_c;
      const isDay = data.current.is_day;
      const windSpeed = data.current.wind_kph;
      const humidity = data.current.humidity;

      dispatch({
        type: "weather/searchCity",
        payload: { city, icon, text, tempC, isDay, windSpeed, humidity },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default weatherSlice.reducer;
