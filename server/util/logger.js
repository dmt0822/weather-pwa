class Logger {
    constructor(
        logLevel = 'info',
        prettify = false
    ) {
        this.logLevel = logLevel;
        this.prettify = prettify;
    }

    debug(data) {
        if(this.logLevel === 'debug') {
            this.log('debug', data);
        }
    }

    info(data) {
        if(
            this.logLevel === 'debug' ||
            this.logLevel === 'info'
        ) {
            this.log('info', data);
        }
    }

    warn(data) {
        if(this.logLevel !== 'error') {
            this.log('warn', data);
        }
    }

    error(data) {
        this.log('error', data);
    }

    log(level, data) {
        const logData = Object.assign({ level }, data);
        if(this.prettify) {
            console[level](JSON.stringify(logData, null, 4));
        } else {
            console[level](JSON.stringify(logData));
        }
    }
}

module.exports = Logger;
