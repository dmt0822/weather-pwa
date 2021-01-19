const axios = require('axios');
const config = require('../config/env.config');

module.exports = {
    async search(req) {
        try {
            const searchString = req.query.s;
            const appId = config.hereAppId;
            const appCode = config.hereAppCode;
            const url = `${config.urls.searchLocation
                .replace('__HERE_APP_ID__', appId)
                .replace('__HERE_APP_CODE__', appCode)
                .replace('__SEARCH_TEXT__', searchString)
            }`;
            const response = await axios({
                method: 'GET',
                url
            });
            req.logger.debug({ status: response.status, data: response.data });
            return response;
        } catch(err) {
            req.logger.debug(err);
            return null;
        }
    },

    async reverseSearch(req) {
        try {
            const regexp = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
            const searchString = req.query.s;
            if(!searchString || !regexp.test(searchString)) {
                throw new Error('Invalid search string');
            }
            const appId = config.hereAppId;
            const appCode = config.hereAppCode;
            const url = `${config.urls.reverseSearchLocation
                .replace('__HERE_APP_ID__', appId)
                .replace('__HERE_APP_CODE__', appCode)
                .replace('__SEARCH_TEXT__', searchString)
            }`;
            const response = await axios({
                method: 'GET',
                url
            });
            req.logger.debug({ status: response.status, data: response.data });
            return response;
        } catch(err) {
            req.logger.debug(err);
            return null;
        }
    }
}