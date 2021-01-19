import React from 'react';
import { formatDate, formatPercentage, formatTemperature } from '../../util/util';
import imageService from '../../services/image-service';
import stateService from '../../services/state-service';
import './hourly-component.scss';

const HourlyComponent = (props) => {
    const data = props.hourlyWeather;

    return (
        <div className="container hourly">
            <span className="hourly-data">{formatDate(data.time, 'hour')}</span>
            <span className="hourly-data">
                <img
                    className="icon-xsmall"
                    src={imageService.getImage(data.icon)}
                    alt={data.icon}
                />
            </span>
            <span className="hourly-data"><strong>Temp:</strong> {formatTemperature(data.temperature, stateService.unit)}&deg;</span>
            <span className="hourly-data"><strong>Precip:</strong> {formatPercentage(data.precipProbability, stateService.unit)}&#37;</span>
        </div>
    );
}

export default HourlyComponent;
