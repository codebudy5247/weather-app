import { useEffect, useState } from "react";
import * as Api from "../services/api";
import { Box, Typography } from "@mui/material";
import { Sun, Moon, Droplet, Wind } from "lucide-react";

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
        console.log(err);
      }
      if (res) {
        setWeatherData(res.data);
      }
    };
    fetchWeatherData();
  }, [latitude, longitude]);

  return (
    <Box>
      {weatherData ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: 3,
              p: 4,
              borderRadius: 4,
              mb: 4,
            }}
          >
            <Typography variant="h6">
              {weatherData.location.name},{weatherData.location.region}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {weatherData.current.is_day === 0 ? (
                <Moon size={50} />
              ) : (
                <Sun size={50} />
              )}

              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              {weatherData.current.condition.text}
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ display: "flex" }}>
                <Droplet size={24} />
                <Typography variant="subtitle1">
                  {weatherData.current.humidity}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Wind size={24} />
                <Typography variant="subtitle1">
                  {weatherData.current.wind_kph}/KPH
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </Box>
  );
};

export default WeatherDisplay;
