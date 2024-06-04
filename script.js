$(document).ready(function() {
    const apiKey = '310b5d4db6ba2e026109193baef56240';
    const searchForm = $('#searchForm');
    const cityInput = $('#cityInput');
    const searchHistory = $('#searchHistory');
    const currentWeather = $('#currentWeather');
    const forecast = $('#forecast');

    searchForm.submit(function(event) {
        event.preventDefault();
        const city = cityInput.val();
        if (city) {
            getWeatherData(city);
            cityInput.val('');
        }
    });

    function getWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                displayCurrentWeather(data);
                addToSearchHistory(city);
                getForecast(data.coord.lat, data.coord.lon);
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
            success: function(data) {
                displayForecast(data);
            },
            error: function(error) {
                console.error('Error fetching forecast data:', error);
            }
        });
    }

    function displayCurrentWeather(data) {
        const tempFahrenheit = (data.main.temp * 9/5 - 459.67).toFixed(2);
        const cityInfo = `<h2>${data.name}, ${data.sys.country}</h2>`;
        const dataInfo = `<p>${new Date(data.dt * 1000).toLocaleDateString()}</p>`;
        const iconInfo = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`;
        const tempInfo = `<p>Temperature: ${tempFahrenheit} &#8451;</p>`;
        const humidityInfo = `<p>Humidity: ${data.main.humidity}%</p>`;
        const windInfo = `<p>Wind Speed: ${data.wind.speed} m/s</p>`;

        currentWeather.html(cityInfo + dataInfo + iconInfo + tempInfo + humidityInfo + windInfo);
    }

    function displayForecast(data) {
        forecast.empty();
        for (let i = 0; i < data.list.length; i += 8) {
            const forecastItem = data.list[i];
            const tempFahrenheit = (forecastItem.main.temp * 9/5 - 459.67).toFixed(2);
            const dateInfo = `<p>${new Date(forecastItem.dt * 1000).toLocaleDateString()}</p>`;
            const iconInfo = `<img src="https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png" alt="Weather Icon">`;
            const tempInfo = `<p>Temperature: ${tempFahrenheit} &#8451;</p>`;
            const windInfo = `<p>Wind Speed: ${forecastItem.wind.speed} m/s</p>`;
            const humidityInfo = `<p>Humidity: ${forecastItem.main.humidity}%</p>`;

            forecast.append(`<div class="forecast-item">${dateInfo + iconInfo + tempInfo + windInfo + humidityInfo}</div>`);
        }
    }

    function addToSearchHistory(city) {
        const historyItem = `<button class="history-item" onclick="getWeatherData('${city}')">${city}</button>`;
        searchHistory.prepend(historyItem);
    }
});
