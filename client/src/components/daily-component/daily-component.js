import React from 'react';
import imageService from '../../services/image-service';
import stateService from '../../services/state-service';
import { formatPercentage, formatDate, formatTemperature } from '../../util/util';
import './daily-component.scss';

export default function DailyComponent(props) {
    const data = props.dailyWeather;

    return (
        <div className="container daily">
            <div className="panel">
                <div className="panel-heading">
                    <div>{formatDate(data.time)}</div>
                </div>
                <div className="panel-content">
                    <div className="panel-content-left">
                        <div className="day-summary">{data.summary}</div>
                        <img src={imageService.getImage(data.icon)} alt={data.icon} className="icon icon-small" />
                    </div>
                    <div className="panel-content-right">
                        <div className="panel-data"><strong>High:</strong> {formatTemperature(data.temperatureHigh, stateService.unit)}&deg;</div>
                        <div className="panel-data"><strong>Low:</strong> {formatTemperature(data.temperatureLow, stateService.unit)}&deg;</div>
                        <div className="panel-data">
                            <strong>
                                {
                                    !!data.precipType && data.precipType
                                        .replace(
                                            data.precipType.charAt(0),
                                            data.precipType.charAt(0).toUpperCase()
                                        )
                                }
                                {!data.precipType && 'Precip'}
                            : </strong>
                            {formatPercentage(data.precipProbability)}&#37;
                        </div>
                        <div className="panel-data"><strong>Sunrise:</strong> {formatDate(data.sunriseTime, 'hour')}</div>
                        <div className="panel-data"><strong>Sunset:</strong> {formatDate(data.sunsetTime, 'hour')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}