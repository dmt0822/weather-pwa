// Private functions
const formatHours = (hour) => {
    switch(hour) {
        case 13:
            return '1';
        case 14:
            return '2';
        case 15:
            return '3';
        case 16:
            return '4';
        case 17:
            return '5';
        case 18:
            return '6';
        case 19:
            return '7';
        case 20:
            return '8';
        case 21:
            return '9';
        case 22:
            return '10';
        case 23:
            return '11';
        case 0:
            return '12';
        default:
            return hour;
    }
}

const formatMinutes = (minute) => {
    if(minute >= 0 && minute < 10) {
        return '0' + minute;
    }
    return minute;
}

export const formatTemperature = (num, unit = 'f') => {
    if(isNaN(num)) {
        return num;
    }

    return Math.round(unit === 'c' ? (num - 32) / 1.8 : num);
}

export const formatPercentage = (num) => {
    if(isNaN(num)) {
        return num;
    }

    return Math.round(num * 100);
}

export const formatDate = (time, type = 'long') => {
    let dateString = '';
    const serialDate = new Date(time * 1000);
    switch(type) {
        case 'long':
            const day = getDayOfWeek(serialDate.getDay());
            const month = serialDate.getMonth() + 1;
            const date = serialDate.getDate();
            dateString = `${day}, ${month}/${date}`;
            break;
        case 'hour':
            const hours = serialDate.getHours();
            const minutes = serialDate.getMinutes();
            const amPm = hours >= 0 && hours < 12 ? 'AM' : 'PM';
            dateString = `${formatHours(hours)}:${formatMinutes(minutes)} ${amPm}`;
            break;
        default:
            break;
    }
    
    return dateString;
}

export const getDayOfWeek = (index) => {
    return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ][index] || '';
}

export const states = {
    LOCATING: 'LOCATING',
    ERROR: 'ERROR',
    COMPLETE: 'COMPLETE',
    FETCH_WEATHER: 'FETCH_WEATHER'
};
