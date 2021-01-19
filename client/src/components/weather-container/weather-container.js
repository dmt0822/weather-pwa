import React, { useState, useEffect } from 'react';
import CurrentComponent from '../current-component/current-component';
import DailyComponent from '../daily-component/daily-component';
import HourlyComponent from '../hourly-component/hourly-component';
import { states } from '../../util/util';
import './weather-container.scss';
import pup from  '../../assets/images/running-dog.gif';

export default function WeatherContainer(props) {
    const [shouldShowHourly, setShouldShowHourly] = useState(false);
    const [arrowDirection, setArrowDirection] = useState('down');

    useEffect(() => {
        shouldShowHourly ? setArrowDirection('up') : setArrowDirection('down');
    }, [shouldShowHourly]);

    if(props.status === states.ERROR) {
        return (
            <div className="container weather-container">
                Well this is embarrassing. Care to try again?
            </div>
        )
    }

    if(props.status === states.LOCATING || props.status === states.FETCH_WEATHER) {
        return (
            <div className="container weather-container">
                <div className="loading-container">
                    <p className="loading-text">Can't talk now, doin' stuff...</p>
                    <div><img src={pup} alt="Running dog" /></div>
                </div>
            </div>
        )
    }

    if(!!props.weatherData && props.status === states.COMPLETE) {
        return (
            <div className="container weather-container">
                <h2 className="heading">
                    Current Conditions in {
                        props?.location?.Location?.Address?.City ||
                        props?.location?.Location?.Address?.County
                    }, {props?.location?.Location?.Address?.State}
                </h2> 
                {
                    !!props.weatherData.currently &&
                    <CurrentComponent currentWeather={props.weatherData.currently} />
                }
                <button
                    type="button"
                    id="get-hourly"
                    className="button link"
                    onClick={()=>setShouldShowHourly(!shouldShowHourly)}
                >
                    Hourly <i className={`fa fa-angle-${arrowDirection}`}></i>
                </button>
                {
                    !!shouldShowHourly && !!props.weatherData.hourly && !!props.weatherData.hourly.data &&
                    props.weatherData.hourly.data.map((hour, index) => {
                        return (
                            <HourlyComponent
                                key={`hourly-${index}`}
                                hourlyWeather={hour} />
                        )
                    })
                }
                <h2 className="heading">Your Daily Forecast</h2>
                {
                    !!props.weatherData.daily && !!props.weatherData.daily.data &&
                    props.weatherData.daily.data.map(day => {
                        return (
                            <DailyComponent
                                key={day.time}
                                dailyWeather={day}
                            />
                        );
                    })
                }
            </div>
        );
    }

    return (<div className="container weather-container"></div>);
}
