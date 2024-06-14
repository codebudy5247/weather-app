import { useEffect, useState } from "react";
import * as Api from "../services/api";
import { Box } from "@mui/material";

interface WeatherDisplayProps {
  latitude: number;
  longitude: number;
}

const WeatherDisplay = ({ latitude, longitude }: WeatherDisplayProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const [err, res] = await Api.getWeather(latitude, longitude);
      if (err) {
        console.log(err.data.message);
      }
      if (res) {
        setWeatherData(res.data);
      }
    };
    fetchWeatherData();
  }, [latitude, longitude]);

  // console.log({ weatherData });

  return (
    <Box>
      {weatherData ? (
        <>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          {/* Add more weather details as needed */}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </Box>
  );
};

export default WeatherDisplay;
