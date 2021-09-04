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
        // return searched name
        citySearchTerm.innerHTML = cityResponse.location.name
        // return searched date & time
        var currentDate = document.querySelector("#current-date")
        currentDate.innerHTML = cityResponse.location.localtime
        // return searched date weather icon
        var currentDateIcon = document.querySelector("#current-date-weather-icon")
        var iconImg = document.createElement('img');
        iconImg.setAttribute('src', cityResponse.current.condition.icon)
        currentDateIcon.appendChild(iconImg)
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


        // forecast bg
        var forecastBackground = document.querySelector("#weekday-item")
        forecastBackground.classList.add("bg-secondary", "text-white")

        // forecast day 1

        // date
        var dayOneDate = document.querySelector("#weekday-item-1-date")
        dayOneDate.innerHTML = cityResponse.forecast.forecastday[0].date
        // icon
        var currentDateIcon1 = document.querySelector("#weekday-item-1-icon")
        var iconImg1 = document.createElement('img');
        iconImg1.setAttribute('src', cityResponse.forecast.forecastday[0].day.condition.icon)
        currentDateIcon1.appendChild(iconImg1)
        // temp
        var dayOneTemp = document.querySelector("#weekday-item-1-temp")
        dayOneTemp.innerHTML = cityResponse.forecast.forecastday[0].day.avgtemp_f
        // wind
        var dayOneWind = document.querySelector("#weekday-item-1-wind")
        dayOneWind.innerHTML = cityResponse.forecast.forecastday[0].day.maxwind_mph
        // humidity
        var dayOneHumidity = document.querySelector("#weekday-item-1-humidity")
        dayOneHumidity.innerHTML = cityResponse.forecast.forecastday[0].day.avghumidity

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