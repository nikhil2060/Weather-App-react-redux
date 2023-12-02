import { useState } from "react";
import "./weatherCard.css";
import {
  MagnifyingGlass,
  MapPinLine,
  MapPin,
  Wind,
  DropHalfBottom,
} from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { searchCity } from "./weatherSlice";

export default function WeatherCard() {
  const { city, icon, temp, isLoading } = useSelector((store) => store.weather);
  return (
    <div className="glass card-container">
      <Search />
      {city && <Main />}
      {city && <Details />}
    </div>
  );
}

function Search() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  function handleCity() {
    if (!city) return;
    dispatch(searchCity(city));
  }

  return (
    <div className="searchContainer">
      <input
        type="text"
        value={city}
        placeholder="Search..."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleCity}>
        <MagnifyingGlass size={20} color="#555" />
      </button>
      <button>
        <MapPinLine size={21} color="#555" />
      </button>
    </div>
  );
}

function Main() {
  const { icon, temp, city, weatherText } = useSelector(
    (store) => store.weather
  );
  console.log(icon);
  return (
    <div className="mainContainer">
      <div className="currentLoc">
        <MapPin size={22} />
        <span>{city}</span>
      </div>
      <div className="tempBox">
        {Math.ceil(temp)}
        <span>°C</span>
      </div>
      <span className="weatherText">{weatherText}</span>
    </div>
  );
}

function Loader() {
  <h1>LOADING....</h1>;
}

function Details() {
  const { windSpeed, humidity } = useSelector((store) => store.weather);
  return (
    <div className="detailBox">
      <div className="det">
        <span>Wind Speed</span>
        <Wind size={32} /> <span></span>
        <span>{windSpeed} KMPH</span>
      </div>
      <div className="det">
        <span>Humidity</span>
        <DropHalfBottom size={32} />
        <span>{humidity}%</span>
      </div>
    </div>
  );
}
