const config = require('../config/env.config');
const geolocationService = require('../services/geolocation');

module.exports = {
    async search(req, res) {
        try {
            const locationResults = await geolocationService.search(req);
            if (locationResults) return res.json(locationResults.data);
            throw new Error('geolocationService returned null from search');
        } catch(err) {
            const message = err.message ? `Reverse search error: ${err.message}` : `Reverse search error`;
            req.logger.error({ message });
            res.status(500).json({ error: 'Error searching location' });
        }
    },

    async reverseSearch(req, res) {
        try {
            const locationResults = await geolocationService.reverseSearch(req);
            if (locationResults) return res.json(locationResults.data);
            throw new Error('gelocationService returned null from reverseSearch');
        } catch(err) {
            const message = err.message ? `Reverse search error: ${err.message}` : `Reverse search error`;
            req.logger.error({ message });
            res.status(500).json({ error: 'Error reverse searching location' });
        }
    }
};
