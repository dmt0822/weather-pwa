import clouds from '../assets/images/clouds.png';
import rain from '../assets/images/rain.png';
import sleet from '../assets/images/sleet.png';
import snow from '../assets/images/snow.png';
import thunderstorm from '../assets/images/thunderstorm.png';
import sunny from '../assets/images/sunny.png';
import tornado from '../assets/images/tornado.png';
import partlyCloudy from '../assets/images/partly-cloudy.png';
import hail from '../assets/images/hail.png';
import fog from '../assets/images/fog.png';
import wind from '../assets/images/wind.png';

const imageService = {
    getImage(name) {
        switch(name) {
            case 'clear-night':
            case 'clear-day':
                return sunny;
            case 'rain':
                return rain;
            case 'snow':
                return snow;
            case 'sleet':
                return sleet;
            case 'wind':
                return wind;
            case 'fog':
                return fog;
            case 'partly-cloudy-night':
            case 'partly-cloudy-day':
                return partlyCloudy;
            case 'cloudy':
                return clouds;
            case 'hail':
                return hail;
            case 'thunderstorm':
                return thunderstorm;
            case 'tornado':
                return tornado;
            default:
                return sunny;

        }
    }
}

export default imageService;

// possible values:
// clear-day
// clear-night, 
// rain, 
// snow, 
// sleet, 
// wind, 
// fog, 
// cloudy, 
// partly-cloudy-day, 
// partly-cloudy-night, 
// hail, 
// thunderstorm, 
// tornado