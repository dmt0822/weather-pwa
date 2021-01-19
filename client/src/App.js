import React, { useState, useEffect } from 'react';
import WeatherContainer from './components/weather-container/weather-container';
import SearchComponent from './components/search-component/search-component';
import InstallComponent from './components/install-component/install-component';
import FooterComponent from './components/footer-component/footer-component';
import geolocationService from './services/geolocation-service';
import weatherService from './services/weather-service';
import stateService from './services/state-service';
import './App.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import { states } from './util/util';

function App() {
    // variables for managing PWA install
    const [shouldShowInstallPrompt, setShouldShowInstallPrompt] = useState(false);
    const [savedEvent, setSavedEvent] = useState(undefined);
    // location selected from the locationList dropdown
    const [selectedLocation, setSelectedLocation] = useState(undefined);
    // list of locations from HERE API
    const [locationList, setLocationList] = useState(undefined);
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const [weatherData, setWeatherData] = useState(undefined);
    const [status, setStatus] = useState(states.COMPLETE);
    const [unit, setUnit] = useState(stateService.unit);

    // if the install prompt has not been displayed in 30 days and the PWA isn't
    // installed, show install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setSavedEvent(e);
        if(!!localStorage) {
            if(localStorage.getItem('dismissal')) {
                const time = new Date();
                const lastDismissal = new Date(localStorage.getItem('dismissal'));
                if((time.getTime() - lastDismissal.getTime()) / 1000 / 3600 / 24 > 30) {
                    setShouldShowInstallPrompt(true);
                }
            } else {
                setShouldShowInstallPrompt(true);
            }
        }
    });

    /**
     * Takes the location data from the HERE geolocation API and returns coordinates.
     * @param {*} data
     */
    const getLocationCoordinates = (data) => {
        if(data && data.Location) {
            if(data.Location.NavigationPosition && data.Location.NavigationPosition[0]) {
                return {
                    longitude: data.Location.NavigationPosition[0].Longitude,
                    latitude: data.Location.NavigationPosition[0].Latitude
                };
            } else if(data.Location.DisplayPosition) {
                return {
                    longitude: data.Location.DisplayPosition.Longitude,
                    latitude: data.Location.DisplayPosition.Latitude
                };
            }
        }
    }

    const onGeolocate = async () => {
        setSelectedLocation(undefined);
        setLocationList(undefined);
        setWeatherData(undefined);
        setStatus(states.LOCATING);
        try {
            const coordinates = await geolocationService.getLocation();
            if(!coordinates.coords || !coordinates.coords.latitude || !coordinates.coords.longitude) {
                throw new Error('Invalid location object');
            }
            const location = await geolocationService.reverseSearch(`${coordinates.coords.latitude},${coordinates.coords.longitude}`);
            setSelectedLocation(location.Response.View[0].Result[0]);
            setStatus(states.COMPLETE);
        } catch(err) {
            setStatus(states.ERROR);
        }
    }

    const onLocationSearch = async (searchText) => {
        setSelectedLocation(undefined);
        setLocationList(undefined);
        setWeatherData(undefined);
        setStatus(states.LOCATING);
        try {
            const response = await geolocationService.search(searchText);
            setLocationList(response?.Response?.View?.[0]?.Result || []);
            setStatus(states.COMPLETE);
        } catch(err) {
            setSelectedLocation(undefined);
            setLocationList(undefined);
            setStatus(states.ERROR);
        }
    }

    const onLocationClick = (event, locationId, lat, long) => {
        setSelectedLocation(undefined);
        try {
            if(locationList?.length > 0) {
                setSelectedLocation(locationList.filter(location => {
                    return location.Location.LocationId === locationId
                })[0]);
            }
        } catch(err) {
            setSelectedLocation(undefined);
        }
    }

    const handleInstallClick = (event) => {
        if(savedEvent) {
            savedEvent.prompt();
            savedEvent.userChoice
                .finally(data => {
                    setShouldShowInstallPrompt(false);
                });
            setSavedEvent(undefined);
        }
    }

    const handleDismiss = (event) => {
        setShouldShowInstallPrompt(false);
        if(!!localStorage) {
            const time = new Date().toUTCString();
            localStorage.setItem('dismissal', time);
        }
    }

    const handleUnitClick = (event) => {
        if(stateService.unit === 'f') stateService.setUnit('c');
        else stateService.setUnit('f');
        setUnit(stateService.unit);
    }

    // if geolocation permissions are granted, get coords when the app loads
    useEffect(() => {
        navigator.permissions.query({name: 'geolocation'})
            .then(permissions => {
                if(permissions.state === 'granted') {
                    onGeolocate();
                }
            });
    }, []);

    // when selectedLocation changes, if truthy, clear locationList and set new coords
    useEffect(() => {
        if(selectedLocation) {
            setLocationList(undefined);
            const {latitude, longitude} = {...getLocationCoordinates(selectedLocation)};
            setLatitude(latitude);
            setLongitude(longitude);
        }
    }, [selectedLocation]);

    // when lat or long change, if truthy, clear weatherData, update status, get new weatherData
    useEffect(() => {
        if(latitude && longitude) {
            setWeatherData(undefined);
            setStatus(states.FETCH_WEATHER);
            weatherService.getWeather({latitude, longitude})
                .then(data => {
                    setWeatherData(data);
                    setStatus(states.COMPLETE);
                })
                .catch(err => {
                    setWeatherData(undefined);
                    setStatus(states.ERROR);
                });
        }
    }, [latitude, longitude]);

    return (
        <div className="page-container">
            {
                shouldShowInstallPrompt &&
                <InstallComponent
                    handleInstallClick={handleInstallClick}
                    handleDismiss={handleDismiss}
                />
            }
            <button className="icon fixed unit-select" onClick={handleUnitClick}>
                Unit: { unit.toUpperCase() }
            </button>
            <SearchComponent
                locationList={locationList}
                onLocationClick={onLocationClick}
                onLocationSearch={onLocationSearch}
                onGeolocation={onGeolocate}
                status={status}
            />
            <WeatherContainer
                location={selectedLocation}
                weatherData={weatherData}
                status={status}
            />
            <FooterComponent />
        </div>
    );
}

export default App;
