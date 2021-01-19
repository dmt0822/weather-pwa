import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register({
    async onUpdate(registration) {
        if(!!Notification) {
            const notify = () => {
                const options = {
                    body: 'Next time you close your browser and visit the website ' +
                    'again, you\'ll get the new version.'
                };
                const notification = new Notification(
                    'An update is available!',
                    options
                );
            }
            if(Notification.permission === 'denied') return;
            if(Notification.permission === 'default') {
                const permission = await Notification.requestPermission().catch(console.error);
                if (permission === 'granted') return notify();
            }
            notify();
        }
    }
});
