// call from weather API

let cityArray = [];
let todaysDate = moment().format("l");  

var day1 = moment(todaysDate).add(1,'day').format("l");  
var day2 = moment(todaysDate).add(2,'day').format("l");  
var day3 = moment(todaysDate).add(3,'day').format("l");  
var day4 = moment(todaysDate).add(4,'day').format("l");  
var day5 = moment(todaysDate).add(5,'day').format("l");  
var forecast = [day1, day2, day3, day4, day5];

// This is our API key
let apikey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Bujumbura,Burundi&appid=" + apikey;

 var query5day = "https://api.openweathermap.org/data/2.5/forecast/daily?" + "q=Bujumbura,Burundi&appid=" + apikey; 

// Here we run our AJAX call to the OpenWeatherMap API
function displayTodaysWeather() {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // store object data
        .then(function (response) {

            // Transfer content to HTML
            $(".city").html(response.name);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text(tempF.toFixed(2));
            $(".humidity").text(response.main.humidity);
            $(".wind").text(response.wind.speed);
            $(".weather").text(response.weather[0].main);
        });
        $(".todays-date").text(todaysDate);
}

var forecast5Day = $(".forecast");
function display5day() {
    $.ajax({
        url: query5day,
        method: "GET"
    })
        // store object data
        .then(function (response) {

            //create new card
            var i; 
        for (i=0; i < forecast.length; i++) {  
            var newDay = $("<div/>").attr({
                class: "card",
            });
            var newCard = $("<div/>").attr({
                class: "card-body",
            });
            var newDate = $("<div/>").attr({
                class: "card-title",
                id: forecast[i],
            });
            var newWeather = $("<div/>").attr({
                class: "weather-day",
                id: forecast[i],
            });
            var newTemp = $("<div/>").attr({
                class: "tempF-day",
                id: forecast[i],
            });
            var newHumidity = $("<div/>").attr({
                class: "humidity-day",
                id: forecast[i],
            });
        //append cards
                // append elements
                forecast5Day.append(newDay);
                newDay.append(newCard);
                newCard.append(newDate, newWeather, newTemp, newHumidity);
    

            // pull per data per day
            newDate.text(forecast[i]);
            newTemp.text("Temp (F): "+((response.list[i].temp.day - 273.15) * 1.80 + 32).toFixed(2));
            newHumidity.text("Humidity: " + response.list[i].humidity + "%");
            newWeather.text(response.list[i].weather[0].main);

        }

        });

}


displayTodaysWeather();
display5day();
