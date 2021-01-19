import config from '../config/config';

const weatherService = {
    async getWeather(coords) {
        try {
            const weatherData = await fetch(
                `${config.localHost}api/get-weather?long=${coords.longitude}&lat=${coords.latitude}`,
                { method: 'GET' }
            );

            if(weatherData.status !== 200) {
                throw new Error('Failed to fetch weather data');
            }

            return Promise.resolve(weatherData.json());
        } catch(err) {
            Promise.reject(err);
        }
    }
};

export default weatherService;
