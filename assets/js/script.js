// var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city-search")
// var cityContainerEl = document.querySelector("#city-container")
// var citySearchTerm = document.querySelector("#current-city")
// var cityButtonsEl = document.querySelector("#city-buttons")
var searchButtonEl = document.querySelector("#search-button")
// var cityTerm = document.getElementById('city-search').value;
var city = ""
// var api = "https://api.openweathermap.org/data/2.5/weather?q="
var cityHistoryEl = document.querySelector("#city-buttons")
// var apiKey = "925a8b4084b1c37f40e3d24c3360648f"
// var units = "&units=imperial";
var pullHistory = document.querySelector("#city-history")
var items = [];



var getWeather = function () {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&units=imperial&appid=925a8b4084b1c37f40e3d24c3360648f")
        .then(function (response) {
            response.json().then(function (data) {

                console.log(data)

                var cityName = document.querySelector("#current-city");
                cityName.innerHTML = data.name + " (" + moment(data.dt, "X").format("MM/DD/YYYY") + ") <img src=' http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png' >"

                var cityTemp = document.querySelector("#current-city-temp");
                $(cityTemp).empty().append("Temp: " + data.main.temp + " ºF")

                var cityWind = document.querySelector("#current-city-wind");
                $(cityWind).empty().append("Wind: " + data.wind.speed + "mph");

                var cityHumidity = document.querySelector("#current-city-humidity");
                $(cityHumidity).empty().append("Humidity: " + data.main.humidity);

                var currentCityUvIndex = document.querySelector("#current-city-uv-index")
                var UvIndex = document.createElement("p")
                UvIndex.classList.add("badge", "badge-danger")
                UvIndex.innerHTML = data.main.humidity
                currentCityUvIndex.innerHTML = "UV: "
                currentCityUvIndex.appendChild(UvIndex)
            })
        })
}

var fiveDayForecast = function() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.value + "&appid=925a8b4084b1c37f40e3d24c3360648f&units=imperial")
        .then(function (response) {
            return response.json()
        })
        .then(function (fiveDayData) {

            console.log(fiveDayData)
            var fiveDayCastArray = fiveDayData.list
            var forecastEl = document.querySelector("#forecast")
            forecastEl.innerHTML = ""
            for (index = 3; index < fiveDayCastArray.length; index = index + 8) {

                console.log(fiveDayCastArray[index])

                forecastEl.innerHTML = forecastEl.innerHTML +
                    `
                    <div class="row">
                        <div id="forecast-item">
                            <h5>${moment(fiveDayCastArray[index].dt, "X").format("MM/DD/YYYY")}</h5>
                            <img src=" http://openweathermap.org/img/wn/${fiveDayCastArray[index].weather[0].icon}.png">
                            <p>Temp: ${fiveDayCastArray[index].main.temp}</p>
                            <p>Wind: ${fiveDayCastArray[index].wind.speed} mph</p>
                            <p>Humidity: ${fiveDayCastArray[index].main.humidity}</p>
                        </div>
                    </div>
                    `
            }
        })
}

var searchHistory = function () {

    // Save History
    localStorage.setItem("value", JSON.stringify(items))


    // Load History
    var cityHistoryName = localStorage.getItem("value", (cityInputEl.value))
    cityHistoryEl.innerHTML = "<button id='city-history' class='btn-secondary btn-lg btn-block'>" + cityHistoryName + "</button>"
}


searchButtonEl.addEventListener("click", (searchInput));
function searchInput() {

    event.preventDefault();

    items.push(cityInputEl.value)

    getWeather();
    fiveDayForecast()
    searchHistory()

 
    console.log(items)
    
}

$(document).on("click", "#city-history", function()
    {
    alert("you clicked the button!")
})

// pullHistory.addEventListener("click", (historyPull));
// function historyPull() {
//     alert("you clicked paris")
// }

// fetch data from weatherAPI.com
// fetch("http://api.weatherapi.com/v1/forecast.json?key=0d8aceedf9ac4705837152922210309&q=paris&days=5&aqi=no&alerts=no")

//     .then(function (cityResponse) {
//         return cityResponse.json();
//     })

//     .then(function (cityResponse) {
//         console.log(cityResponse)
//         // return searched name
//         citySearchTerm.innerHTML = cityResponse.location.name
//         // return searched date & time
//         var currentDate = document.querySelector("#current-date")
//         currentDate.innerHTML = "(" + cityResponse.location.localtime + ")"
//         // return searched date weather icon
//         var currentDateIcon = document.querySelector("#current-date-weather-icon")
//         var iconImg = document.createElement('img');
//         iconImg.setAttribute('src', cityResponse.current.condition.icon)
//         currentDateIcon.appendChild(iconImg)
//         // return searched city temp
//         var currentCityTemp = document.querySelector("#current-city-temp")
//         currentCityTemp.innerHTML = "Temperature: " + cityResponse.current.temp_f + " ºF"
//         // return searched city wind
//         var currentCityWind = document.querySelector("#current-city-wind")
//         currentCityWind.innerHTML = "Wind Speed: " + cityResponse.current.wind_mph + " mph"
//         // return searched city Humidity
//         var currentCityHumidity = document.querySelector("#current-city-humidity")
//         currentCityHumidity.innerHTML = "Humidity: " + cityResponse.current.humidity + "%"
//         // return searched city UV Index
//         var currentCityUvIndex = document.querySelector("#current-city-uv-index")
//         var UvIndex = document.createElement("p")
//         UvIndex.classList.add("badge", "badge-danger")
//         UvIndex.innerHTML = cityResponse.current.uv
//         currentCityUvIndex.innerHTML = "UV: "
//         currentCityUvIndex.appendChild(UvIndex)
//         // add color to city UV Index



//         // forecast bg
//         var forecastBackground = document.querySelector("#weekday-item")
//         forecastBackground.classList.add("bg-primary", "text-white")

//         // forecast day 1

//         // date
//         var dayOneDate = document.querySelector("#weekday-item-1-date")
//         dayOneDate.innerHTML = cityResponse.forecast.forecastday[0].date
//         // icon
//         var currentDateIcon1 = document.querySelector("#weekday-item-1-icon")
//         var iconImg1 = document.createElement('img');
//         iconImg1.setAttribute('src', cityResponse.forecast.forecastday[0].day.condition.icon)
//         currentDateIcon1.appendChild(iconImg1)
//         // temp
//         var dayOneTemp = document.querySelector("#weekday-item-1-temp")
//         dayOneTemp.innerHTML = "Temp: " + cityResponse.forecast.forecastday[0].day.avgtemp_f + " ºF"
//         // wind
//         var dayOneWind = document.querySelector("#weekday-item-1-wind")
//         dayOneWind.innerHTML = "Wind: " + cityResponse.forecast.forecastday[0].day.maxwind_mph + " mph"
//         // humidity
//         var dayOneHumidity = document.querySelector("#weekday-item-1-humidity")
//         dayOneHumidity.innerHTML = "Humidity: " + cityResponse.forecast.forecastday[0].day.avghumidity + "%"

//     })

// var searchSubmitHandler = function (event) {
//     event.preventDefault();

//     var cityName = cityInputEl.value.trim()

//     if (cityName) {
//         cityInputEl.value = ""
//     } else {
//         alert("Enter a City Name")
//     }
// }

// var buttonClickHandler = function (event) {
//     var cityName = event.target.getAttribute("")
// }

// searchButtonEl.addEventListener("click", getWeather)