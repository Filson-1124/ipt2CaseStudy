// Weather API
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};

// Event listener for Enter key
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeatherReport(searchInputBox.value);
    }
});

// Fetch weather
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => weather.json())
        .then(showWeaterReport);
}

// Show weather
function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    } else if(city_code==='404'){
        swal("Bad Input", "City not found", "warning");
        reset();
    } else {
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        op.innerHTML = `
        <div class="location-deatils">
            <div class="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date">${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp">${Math.round(weather.main.temp)}&deg;C</div>
            <div class="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
            <div class="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>`;
        changeBg(weather.weather[0].main);
        reset();
    }
}

// Utility functions
function getTime(todayDate){ let h=addZero(todayDate.getHours()); let m=addZero(todayDate.getMinutes()); return `${h}:${m}`;}
function addZero(i){ return i<10?"0"+i:i;}
function dateManage(dateArg){ 
    let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${dateArg.getDate()} ${months[dateArg.getMonth()]} (${days[dateArg.getDay()]}), ${dateArg.getFullYear()}`;
}
function changeBg(status){ 
    // simple background change inside modal
    document.querySelector('.modal-content').style.backgroundImage = 'none';
}
function getIconClass(classarg){
    switch(classarg){
        case 'Rain': return 'fas fa-cloud-showers-heavy';
        case 'Clouds': return 'fas fa-cloud';
        case 'Clear': return 'fas fa-cloud-sun';
        case 'Snow': return 'fas fa-snowman';
        case 'Sunny': return 'fas fa-sun';
        case 'Mist': return 'fas fa-smog';
        case 'Thunderstorm': case 'Drizzle': return 'fas fa-thunderstorm';
        default: return 'fas fa-cloud-sun';
    }
}
function reset(){ searchInputBox.value = ""; }

// Modal functionality
const weatherModal = document.getElementById('weatherModal');
const openWeatherBtn = document.getElementById('openWeather');
const closeWeatherBtn = document.getElementById('closeWeather');

openWeatherBtn.onclick = () => weatherModal.style.display = "block";
closeWeatherBtn.onclick = () => weatherModal.style.display = "none";
window.onclick = (e) => { if(e.target === weatherModal){ weatherModal.style.display = "none"; }};
