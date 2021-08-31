var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city-search")
var cityContainerEl = document.querySelector("#city-container")
var citySearchTerm = document.querySelector("#current-city")
var cityButtonsEl = document.querySelector("#city-buttons")
var searchButtonEl = document.querySelector("#search-button")

var searchSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim()

    if (cityName) {
        getSearchWeather();
        cityInputEl.value = ""
    } else {
        alert("Enter a City Name")
    }
}

var buttonClickHandler = function (event) {
    var cityname = event.target.getAttribute("")
}

searchButtonEl.addEventListener("submit", searchSubmitHandler)