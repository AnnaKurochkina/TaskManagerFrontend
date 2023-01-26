import "./Weather.scss";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
    HStack,
    Image,
    StackDivider,
    Text,
    VStack,
} from "@chakra-ui/react";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

// import Unsplash, { toJson } from "unsplash-js";

const Weather = ({ geoLongitude, geoLatitude }) => {
    const [details, setDetails] = useState({});
    const [forecast, setForecast] = useState({});
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [icon, setIcon] = useState("");
    const [localWeather, setLocalWeather] = useState("");
    const [locationName, setLocationName] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [temperature, setTemperature] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [currentLatitude, setCurrentLatitude] = useState(geoLatitude);
    const [currentLongitude, setCurrentLongitude] = useState(geoLongitude);
    const [city, setCity] = useState(null);

    // const [img, setImg] = useState("");
    // const [res, setRes] = useState([]);

    // const unsplash = new Unsplash({
    // 	accessKey: "4d-NB7OZDR1eHoFNC3NnDgZzDz2ZRzz6hYhPoQELOFw",
    //   });

    const getCities = async (searchTerm) => {
        const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${searchTerm}`;
        const res = await fetch(url);
        const searchResults = await res.json();
        setCityOptions(searchResults);
        console.log(searchResults);
    };

    const onInputChange = async (event, value, reason) => {
        if (value) {
            await getCities(value);
            // await fetchImage(value);
        } else {
            setCityOptions([]);
        }
    };

    const getLocationDetails = async () => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${currentLatitude},${currentLongitude}&aqi=no2`;
        const res = await fetch(url);
        const data = await res.json();
        setDetails(data);
        setLocalWeather(data.current.condition.text);
        setIcon(data.current.condition.icon);
        setLocationName(data.location.name);
        setLastUpdated(data.current.last_updated);
        setTemperature(data.current.temp_c);
    };

    const getForecast = async () => {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${currentLatitude},${currentLongitude}&days=4&aqi=yes&alerts=yes`;
        const res = await fetch(url);
        const dataForecast = await res.json();
        setForecast(dataForecast);
        setWeatherForecast(dataForecast.forecast.forecastday);
    };

    // const fetchImage = async () => {
    //     const url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=4d-NB7OZDR1eHoFNC3NnDgZzDz2ZRzz6hYhPoQELOFw&per_page=20`;
    //     const res = await fetch(url);
    //     const backgroundImg = await res.json();
    //     setRes(backgroundImg);
    // };


    useEffect(() => {
        getLocationDetails();
        getForecast();
    }, [currentLatitude, currentLongitude]);

    const muiTheme = createTheme();

    return (
        <div className="weather">
            <ThemeProvider theme={muiTheme}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onInputChange={onInputChange}
                    value={city}
                    onChange={(event, newCity) => {
                        setCity(newCity);
                        setCurrentLatitude(newCity.lat);
                        setCurrentLongitude(newCity.lon);
                    }}
                    getOptionLabel={(option) => option.name}
                    options={cityOptions}
                    sx={{ width: 300, border: "white solid 2px" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Type city"
                            sx={{
                                input: { color: "#00838f" },
                                label: { color: "#00838f", fontSize: "1.5rem" },
                            }}
                        />
                    )}
                />
            </ThemeProvider>
            <h3>Current weather in {locationName}: </h3>
            <HStack
                divider={<StackDivider />}
                borderColor="gray.200"
                borderWidth="2px"
                spacing={4}
                align="stretch"
                marginTop="2rem"
                borderRadius={"1rem"}
                padding="1rem"
            >
                {weatherForecast.map((d) => (
                    <VStack key={d.date} fontSize={20}>
                        <Text>{d.date}</Text>
                        <Text>{d.day.condition.text}</Text>
                        <Text>{d.day.avgtemp_c} &#176;C</Text>
                        <Image src={d.day.condition.icon} fallbackSrc="icon" />
                        <Text>Sunrise: {d.astro.sunrise}</Text>
                        <Text>Sunset: {d.astro.sunset}</Text>
                    </VStack>
                ))}
            </HStack>
        </div>
    );
};

export default Weather;
