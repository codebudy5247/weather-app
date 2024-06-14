import "./App.css";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import WeatherDisplay from "./components/WeatherDisplay";
import MapDisplay from "./components/MapDisplay";
import { useState } from "react";

function App() {
  const [input, setInput] = useState({
    latitude: 28.57,
    longitude: 77.32,
  });

  const handleMapClick = (lat: number, lng: number) => {
    setInput({ ...input, latitude: lat, longitude: lng });
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xl">
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginTop: 2,
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
                  width: "100%",
                }}
              >
                <WeatherDisplay
                  latitude={input.latitude}
                  longitude={input.longitude}
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
                    defaultValue={input.latitude}
                    onChange={(e) =>
                      setInput({ ...input, latitude: Number(e.target.value) })
                    }
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Longitude"
                    variant="outlined"
                    defaultValue={input.longitude}
                    onChange={(e) =>
                      setInput({ ...input, longitude: Number(e.target.value) })
                    }
                  />
                </Stack>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", height: "100%", p: 2 }}>
              <MapDisplay
                latitude={input.latitude}
                longitude={input.longitude}
                zoomLevel={13}
                onMapClick={handleMapClick}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
