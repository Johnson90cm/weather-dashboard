var cityInputEl = document.querySelector("#city-search");
var searchButtonEl = document.querySelector("#search-button");
var cityHistoryEl = document.querySelector("#city-buttons");
var pullHistory = document.querySelector("#city-history");
var items = [];

// render current weather search
var getWeather = function (city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9a9ed03a355403f4cb9a36e931c0b4a")
        .then(function (response) {
            response.json().then(function (data) {

                console.log(data)

                var cityName = document.querySelector("#current-city");
                cityName.innerHTML = data.name + " (" + moment(data.dt, "X").format("MM/DD/YYYY") + ") <img src=' http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png' >"

                var cityTemp = document.querySelector("#current-city-temp");
                $(cityTemp).empty().append("Temp: " + data.main.temp + " ºF")

                var cityWind = document.querySelector("#current-city-wind");
                $(cityWind).empty().append("Wind: " + data.wind.speed + " mph");

                var cityHumidity = document.querySelector("#current-city-humidity");
                $(cityHumidity).empty().append("Humidity: " + data.main.humidity);

                var currentCityUvIndex = document.querySelector("#current-city-uv-index")
                var UvIndex = document.createElement("p")
                UvIndex.classList.add("badge", "badge-danger")
                UvIndex.innerHTML = data.main.humidity
                currentCityUvIndex.innerHTML = "UV: "
                currentCityUvIndex.appendChild(UvIndex)

                fiveDayForecast(city)
            })
        })
}

// render current weather forecast - 5 days
var fiveDayForecast = function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c9a9ed03a355403f4cb9a36e931c0b4a&units=imperial")
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
                    <div class="card" style="width: 11rem;">
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

// save and render searched cities history
var searchHistory = function () {

    // Save History
    localStorage.setItem("value", JSON.stringify(items))

    // Load History
    cityHistoryEl.innerHTML = ""
    for (i = 0; i < items.length; i++) {
        var createHistory = document.createElement("button")
        createHistory.setAttribute("class", "btn-secondary btn-lg btn-block city-history")

        createHistory.innerHTML = ("value", items[i])
        cityHistoryEl.append(createHistory)
    }
}

// city history handler
function handleSearchHistory(event) {

    if (!event.target.matches(".city-history")) {
        return
    }
    var cityTarget = event.target.textContent
    console.log(cityTarget)
    getWeather(cityTarget)
}

// search button handler
searchButtonEl.addEventListener("click", (searchInput));
function searchInput() {

    var searchedCity = cityInputEl.value

    event.preventDefault();

    items.push(cityInputEl.value)

    getWeather(searchedCity);

    searchHistory()

    console.log(items)
}

// history button handler
cityHistoryEl.addEventListener("click", handleSearchHistory)