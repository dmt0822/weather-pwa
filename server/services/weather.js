const axios = require('axios');
const config = require('../config/env.config');
const ErrorHandler = require('../util/error-handler');

module.exports = {
    async getWeather(req) {
        let url;
        try {
            const { long, lat } = { ...req.query };
            const safeCoord = /^\-?\d+\.?\d*$/;
            if(!long) throw ErrorHandler.throwError('Bad Request', 'Longitude is missing');
            if(!lat) throw ErrorHandler.throwError('Bad Request', 'Latitude is missing');
            if(!safeCoord.test(long) || !safeCoord.test(lat)) {
                throw ErrorHandler.throwError('Bad Request', 'Invalid coordinates');
            }
            url = config.urls.getWeather
                .replace(/__API_KEY__/, config.weatherAPIKey)
                .replace(/__LAT__/, lat)
                .replace(/__LONG__/, long);
            req.logger.info({ message: `Requesting weather from ${url}` });
            const response = await axios({
                method: 'GET',
                url
            });
            req.logger.debug(response.data);
            req.logger.info({ message: 'Weather data fetched successfully' });
            return response;
        } catch(error) {
            const message = (err && err.message) ?
                `get-weather service error: ${err.message}` :
                `get-weather service error: ${url}`;
            req.logger.error({ message });
            return null;
        }
    }
}