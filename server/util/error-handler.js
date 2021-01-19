const ErrorHandler = {
    /**
     * Returns an error object
     * @param name
     * @param message
     * @returns a new error object
     */
    throwError(name, message) {
        let error;

        if(name && message) {
            error = new Error(message);
            error.name = name;
        } else {
            error = new Error('Something bad happened');
            error.name = 'Generic';
        }

        return error;
    }
};

module.exports = ErrorHandler;
