module.exports = {
    logLevel: process.env.LOG_LEVEL || 'debug',
    weatherAPIKey: process.env.DARK_SKY_KEY,
    hereAppId: process.env.HERE_APP_ID,
    hereAppCode: process.env.HERE_APP_CODE,
    nodeEnv: process.env.NODE_ENV || 'production',
    enableHttps: process.env.ENABLE_HTTPS || false,
    urls: {
        getWeather: 'https://api.darksky.net/forecast/__API_KEY__/__LAT__,__LONG__',
        searchLocation: 'https://geocoder.api.here.com/6.2/geocode.json?app_id=__HERE_APP_ID__&app_code=__HERE_APP_CODE__&searchtext=__SEARCH_TEXT__',
        reverseSearchLocation: 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json? app_id=__HERE_APP_ID__&app_code=__HERE_APP_CODE__&prox=__SEARCH_TEXT__&mode=retrieveAreas'
    }
}