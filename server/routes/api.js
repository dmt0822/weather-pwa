const express = require('express');
const router = express.Router();
const axios = require('axios');
const geolocationController = require('../controllers/geolocation');
const weatherController = require('../controllers/weather');

router.get('/get-weather', weatherController.getWeather);
router.get('/search', geolocationController.search);
router.get('/reverse-search', geolocationController.reverseSearch)

module.exports = router;
