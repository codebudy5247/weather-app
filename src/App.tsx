import "./App.css";
import {
  Box,
  Container,
  CssBaseline,
  Stack,
  TextField
} from "@mui/material";
import WeatherDisplay from "./components/WeatherDisplay";
import MapDisplay from "./components/MapDisplay";
import { useState } from "react";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [input, setInput] = useState({
    location: "",
    latitude: "",
    longitude: "",
  });

  console.log(input);
  
  const handleMapClick = (lat:number, lng:number) => {
    setInput({ ...input, latitude: lat.toString(), longitude: lng.toString() });
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        > 
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
              width: "80%",
            }}
          >
            <WeatherDisplay latitude={28.57} longitude={77.32} />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Location"
              variant="outlined"
              value={input.location}
              onChange={(e) => setInput({ ...input, location: e.target.value })}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ width: "100%" }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
                value={input.latitude}
                onChange={(e) => setInput({ ...input, latitude: e.target.value })}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
                value={input.longitude}
                onChange={(e) => setInput({ ...input, longitude: e.target.value })}
              />
            </Stack>

            <SearchHistory />
          </Box>

          <Box sx={{ width: "100%", height: "70%", border: "3px solid red" }}>
            <MapDisplay latitude={28.57} longitude={77.32} zoomLevel={13} onMapClick={handleMapClick} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
