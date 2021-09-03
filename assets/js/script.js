var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city-search")
var cityContainerEl = document.querySelector("#city-container")
var citySearchTerm = document.querySelector("#current-city")
var cityButtonsEl = document.querySelector("#city-buttons")
var searchButtonEl = document.querySelector("#search-button")

var cityTerm = document.getElementById('city-search').value;


fetch ("http://api.weatherapi.com/v1/forecast.json?key=0d8aceedf9ac4705837152922210309&q=paris&days=5&aqi=no&alerts=no")

.then(function(cityResponse) {
    return cityResponse.json();
})

.then(function(cityResponse) {
    console.log(cityResponse)
    citySearchTerm.innerHTML = cityResponse.location.name
    var currentCityTemp = document.querySelector("#current-city-temp")
    currentCityTemp.innerHTML = cityResponse.current.temp_f
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