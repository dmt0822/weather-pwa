const weatherService = require('../services/weather');

module.exports = {
    async getWeather(req, res) {
        try {
            const weatherResponse = await weatherService.getWeather(req);
            if (weatherResponse) return res.json(weatherResponse.data);
            throw new Error('weatherService returned null from getWeather');
        } catch(err) {
            req.logger.debug(err);
            err.name && err.name === 'Bad Request' ?
                res.status(400).json({ error: 'Bad request' }) :
                res.status(500).json({ error: 'Encountered an error getting weather data' });

        }
    }
};
