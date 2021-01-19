import config from '../config/config';

const geolocationService = {
    getLocation() {
        return new Promise((resolve, reject) => {
            try {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(position);
                });
            } catch(err) {
                reject(err);
            }
        });
    },

    async search(searchText = '') {
        try {
            const response = await fetch(`${config.localHost}api/search?s=${searchText}`, { method: 'GET' });
            const data = await response.json();
            return Promise.resolve(data);
        } catch(err) {
            return Promise.reject(err);
        }
    },

    async reverseSearch(searchText = '') {
        try {
            if(!searchText) {
                throw new Error('Not a valid reverse search location');
            }
            const response = await fetch(`${config.localHost}api/reverse-search?s=${searchText}`, { method : 'GET' });
            const data = await response.json();
            return Promise.resolve(data);
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

export default geolocationService;
