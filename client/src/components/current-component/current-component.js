import React from 'react';
import imageService from '../../services/image-service';
import stateService from '../../services/state-service';
import { formatPercentage, formatTemperature } from '../../util/util';

export default function CurrentComponent(props) {
    const data = Object.assign({}, props.currentWeather);

    if(data) {
        return (
            <div className="container current">
                <div className="panel">
                    <div className="panel-content current-content">
                        <div className="panel-content-left text-center">
                            <img
                                className="icon icon-large"
                                src={imageService.getImage(data.icon)}
                                alt={data.icon}
                            />
                        </div>
                        <div className="panel-content-right">
                            <div className="panel-data">
                                <span><strong>Temperature:</strong> </span>
                                {formatTemperature(data.temperature, stateService.unit) || ''}&deg;
                            </div>
                            <div className="panel-data">
                                <span><strong>Feels like:</strong> </span>
                                {formatTemperature(data.apparentTemperature, stateService.unit) || ''}&deg;
                            </div>
                            <div className="panel-data">
                                <span>
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
                                </span>
                            </div>
                            <div className="panel-data"><span><strong>Humidity:</strong> </span>{formatPercentage(data.humidity)}&#37;</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="current-container">Currently unavailable</div>
        )
    }
};
