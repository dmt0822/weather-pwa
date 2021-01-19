const stateService = {
    unit: localStorage.getItem('unit') || 'f',

    setUnit(value = 'f') {
        const valueLowerCase = value.toLowerCase();
        this.unit = valueLowerCase;

        if(valueLowerCase === 'f' || valueLowerCase === 'c') {
            if(localStorage) {
                localStorage.setItem('unit', valueLowerCase);
            }
        }
    }
};

export default stateService;
