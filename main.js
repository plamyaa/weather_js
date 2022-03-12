import { WEATHER_UI, LOCATIONS, isEmpty, apiKey, serverUrl, roundTemp, editTime} from "./view.js";

WEATHER_UI.SEARCH_BTN.addEventListener('click', sendCity);
WEATHER_UI.NOW.LIKE.addEventListener('click', _toggle);

async function sendCity() {

    let cityValue = WEATHER_UI.SEARCH_INPUT.value;
    if (cityValue === isEmpty)
        return;
    let response = await fetch(`${serverUrl}?q=${cityValue}&appid=${apiKey}`);
    if (response.ok) {
        let json = await response.json();
        WEATHER_UI.NOW.PICTURE.src = `http://openweathermap.org/img/w/${json.list[0].weather[0].icon}.png`;
        WEATHER_UI.NOW.CITY.textContent =  json.city.name;
        WEATHER_UI.NOW.TEMPERATURE.textContent = roundTemp(json.list[0].main.temp); 
        WEATHER_UI.NOW.PICTURE.style.opacity = 1;
        WEATHER_UI.NOW.LIKE.style.opacity = 1;
        WEATHER_UI.SEARCH_INPUT.value = isEmpty;

        WEATHER_UI.DETAILS.CITY.textContent = json.city.name;
        WEATHER_UI.DETAILS.TEMPERATURE.textContent = "Temperature: " + roundTemp(json.list[0].main.temp);
        WEATHER_UI.DETAILS.FEELS_LIKE.textContent = "Feels like: " + roundTemp(json.list[0].main.feels_like);
        WEATHER_UI.DETAILS.WEATHER.textContent = "Weather: " + json.list[0].weather[0].main;
        WEATHER_UI.DETAILS.SUNRISE.textContent = "Sunrise: " + editTime(json.city.sunrise);
        WEATHER_UI.DETAILS.SUNSET.textContent = "Sunset: " + editTime(json.city.sunset);

        forecastAdd(json);
        likeCheck(cityValue);
    } 
    else {
        alert("Ошибка HTTP: " + response.status);
    }
}

function forecastAdd(json){
    WEATHER_UI.FORECAST.TIME_LIST.innerHTML = isEmpty;
    WEATHER_UI.FORECAST.CITY.textContent = json.city.name;
    for (let i = 0; i < 9; i++) {
        let div = document.createElement('div');
        div.className = "time-block";
        div.innerHTML = `<p class="data">${json.list[i].dt_txt.slice(8, 10) + '.' + json.list[i].dt_txt.slice(5, 7)}</p>
                        <p class="time">${json.list[i].dt_txt.slice(11, -3)}</p>
                        <div class="info-temperature">
                            <p class="info-item-1">Temperature: ${roundTemp(json.list[i].main.temp)}</p>
                            <p class="info-item-2">Feels like: ${roundTemp(json.list[i].main.feels_like)}</p>
                        </div>
                        <div class="img-temperature">
                            <p class="img-item">${json.list[i].weather[0].main}</p>
                            <img class="img-icon" src="${`http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png`}">
                        </div>`
        WEATHER_UI.FORECAST.TIME_LIST.append(div);
    }
}

function likeCheck(cityValue){
    for (let i = 0; i < LOCATIONS.length; i++) {
        if (LOCATIONS[i].textContent == cityValue) {
            WEATHER_UI.NOW.LIKE.setAttribute("src", "Heart_red.svg");
            break;
        }
        else {
            WEATHER_UI.NOW.LIKE.setAttribute("src", "Heart.svg");
        }
    }
}

function _toggle(){
    if (this.getAttribute("src") == "Heart.svg" ){
        this.setAttribute("src", "Heart_red.svg");
        addLocation(WEATHER_UI.NOW.CITY.textContent);  
    }
    else {
        this.setAttribute("src", "Heart.svg");
        deleteLocation();
    }
}

function addLocation (cityName){
    let li = document.createElement("li");
    li.classList.add('item-city');
    li.textContent = cityName;
    li.addEventListener('click', function(){
        WEATHER_UI.SEARCH_INPUT.value = cityName;
        sendCity();
    });
    WEATHER_UI.LIST.append(li);
}

function deleteLocation() {
    for(let i = 0; i < LOCATIONS.length; i++){
        if (LOCATIONS[i].textContent == WEATHER_UI.NOW.CITY.textContent){
            LOCATIONS[i].remove();
        }
    }
}

