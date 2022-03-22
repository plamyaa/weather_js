export const WEATHER_UI = {
    SEARCH_BTN : document.querySelector('.search-btn'),
    SEARCH_INPUT : document.querySelector('.city-search'),
    LIST : document.querySelector('.cities-list'),
    NOW : {
        TEMPERATURE : document.querySelector('.city-temperature'),
        CITY : document.querySelector('.city-name-1'),
        PICTURE : document.querySelector('.picture-temperature'),
        LIKE : document.querySelector('.city-like'),
    },
    DETAILS : {
        CITY : document.querySelector('.city-name-2'),
        TEMPERATURE : document.getElementById('temp'),
        FEELS_LIKE : document.getElementById('temp-2'),
        WEATHER : document.getElementById('weather'),
        SUNRISE : document.getElementById('sunrise'),
        SUNSET : document.getElementById('sunset'),
    },
    FORECAST : {
        CITY : document.querySelector('.city-name-3'),
        TIME_LIST : document.querySelector('.time-list'),
    }
}
export const LOCATIONS = document.getElementsByClassName('item-city');
export const isEmpty = '';
export const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
export const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';

export function roundTemp(value){
    return Math.round(value - 273.15) + '°';
}

export function editTime(value) {
    let date = new Date(value * 1000);
    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())+ ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
}

export let keys = Object.keys(localStorage);
