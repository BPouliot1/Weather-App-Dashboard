$(document).ready(function() {
    const apiKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
    const searchform = $('#searchForm');
    const cityInput = $('#cityInput');
    const searchHistory = $('#searchHistory');
    const currentWeather = $('#currentWeather');
    const forecast = $('#forcast');

    searchform.submit(function(event) {
        event.preventDefault();
        const city = cityInput.val();
        if (city) {
            getWeatherData(city);
            cityInput.val('');
        }
    });
    function getWeatherData(city) {
        cosnt apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        $.ajax({
            url:apiUrl,
            method: 'GET',
            success: function (data) {
                displayCurrentWeather(data);
                addToSearchHistory(city);
                getForecast(data.coord.let, data.coord.lon);
            },
            error: function(error) {
                console.error('Error fetching weather data:', error);
            }
        });
    }
    function getForecast(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                displayForecast(data);
            },
            error: function (error) {
                console.error('Error fetching forcast data:', error);
            }
        });
    }
    function  displayCurrentWeather(data) {
        const cityInfo = '<h2>${data.name}, ${data.sys.country}</h2>';
        const dataInfo = '<p>${new Date(data.dt * 1000).toLocaleDateString()}</p>';
        const iconInfo = '<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`';
        const tempInfo = '<p>Temperature: ${data.main.temp} &#8451;</p>';
        const humidityInfo = '<p>Humidity: ${data.main.humidity}%</p>';
        const windInfo = '<p>Wind Speed: ${data.wind.speed} m/s</p>';

        currentWeather.html(cityInfo + dataInfo + iconInfo + tempInfo + humidityInfo + windInfo);
    }
    
})