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
})