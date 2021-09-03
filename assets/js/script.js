var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city-search")
var cityContainerEl = document.querySelector("#city-container")
var citySearchTerm = document.querySelector("#current-city")
var cityButtonsEl = document.querySelector("#city-buttons")
var searchButtonEl = document.querySelector("#search-button")
var cityTerm = document.getElementById('city-search').value;

// fetch data from weatherAPI.com
fetch("http://api.weatherapi.com/v1/forecast.json?key=0d8aceedf9ac4705837152922210309&q=paris&days=7&aqi=no&alerts=no")

    .then(function (cityResponse) {
        return cityResponse.json();
    })

    .then(function (cityResponse) {
        console.log(cityResponse)
        // return searched name, date & icon
        var currentDate = document.querySelector("#current-date")
        var currentDateIcon = document.querySelector("#current-date-weather-icon")
        citySearchTerm.innerHTML = cityResponse.location.name
        currentDate.innerHTML = cityResponse.location.localtime
        currentDateIcon.innerHTML = cityResponse.current.condition.icon
        // return searched city temp
        var currentCityTemp = document.querySelector("#current-city-temp")
        currentCityTemp.innerHTML = cityResponse.current.temp_f
        // return searched city wind
        var currentCityWind = document.querySelector("#current-city-wind")
        currentCityWind.innerHTML = cityResponse.current.wind_mph
        // return searched city Humidity
        var currentCityHumidity = document.querySelector("#current-city-humidity")
        currentCityHumidity.innerHTML = cityResponse.current.humidity
        // return searched city UV Index
        var currentCityUvIndex = document.querySelector("#current-city-uv-index")
        currentCityUvIndex.innerHTML = cityResponse.current.uv
    })

var searchSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim()

    if (cityName) {
        cityInputEl.value = ""
    } else {
        alert("Enter a City Name")
    }
}

// var buttonClickHandler = function (event) {
//     var cityName = event.target.getAttribute("")
// }

searchButtonEl.addEventListener("click", searchSubmitHandler)