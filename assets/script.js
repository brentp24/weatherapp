


var cityTarget = localStorage.getItem("cityTarget");
var cityArray = [];
let todaysDate = moment().format("l");
var day1 = moment(todaysDate).add(1, 'day').format("l");
var day2 = moment(todaysDate).add(2, 'day').format("l");
var day3 = moment(todaysDate).add(3, 'day').format("l");
var day4 = moment(todaysDate).add(4, 'day').format("l");
var day5 = moment(todaysDate).add(5, 'day').format("l");

const Clouds = "assets/images/partlycloudy.png"
const partlyCloudy = "assets/images/partlycloudy.png"
const Rain = "assets/images/rain.png"
const Snow = "assets/images/snow.png"
const Clear = "assets/images/clear.png"

var forecast = [day1, day2, day3, day4, day5];
$(".todays-date").text(todaysDate);
// Need to get my own API Key
var apikey = "166a433c57516f51dfab1f7edaed8413";



// click search button
$("#search-icon").on("click", function () {
    //assigns user input to city
    cityTarget = $("#search").val().trim();
    $("#city-name").val(cityTarget);
    //store in local storage
    cityArray.push(cityTarget);
    localStorage.setItem("cityTarget", cityTarget);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    var stored = JSON.parse(localStorage.getItem("cityArray"));
    console.log(stored);
    //if no text in input return nothing
    if ($("#search").val() === "") {
        return;
    }
    //display city info
    displayTodaysWeather();
    displayUV();
    display5day();
    

    //add city to city list
    $(".city-list").empty();
    var reversedStored = stored.reverse();
    for (i = 0; i < Math.min(8, reversedStored.length); i++) {
        var cityList = $(".city-list");
        var newListItem = $("<div/>").attr({
            class: "btn btn-light",
            type: "button",
            id: "btn_" + reversedStored[i],
            value: reversedStored[i],
        });


        cityList.append(newListItem);
        newListItem.append(reversedStored[i]);

    }
    // this drove me crazy.... I couldn't figure out why the selection wouldn't persist. 
    $("#search").val("");
    event.preventDefault();


});

// click list item button
$("body").on("click", ".btn", function () {
    cityTarget = $(this).html();
    console.log($(this).html());
    displayTodaysWeather();
    displayUV();
    display5day();
    $("#search").val("");
    event.preventDefault();
})


// Today's Weather
function displayTodaysWeather() {


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityTarget + "&appid=" + apikey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // store object data
        .then(function (response) {
            // Transfer content to HTML
            $("#todays-icon").empty();
            $(".city").html(response.name);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text(tempF.toFixed(0));
            $(".humidity").text(response.main.humidity);
            $(".wind").text(response.wind.speed);
            //add the icon
            var todaysWeather = $("<img/>").attr({
                src: eval(response.weather[0].main),
                alt: response.weather[0].main,
                height: "50px",
                width: "50px",
            });
            $("#todays-icon").append(todaysWeather);

        }).catch(function (error) {
            console.log(error);
        });
}

function displayUV() {
// find UV 
    var queryUV = "api.openweathermap.org/data/2.5/uvi?" + cityTarget + "&appid=" + apikey;

//     $.ajax({
//         url: queryUV,
//         method: "GET"
//     })
//         // store object data
//         .then(function (response) {
//             // Transfer content to HTML
//             console.log(response);
//             $(".uv").html(response.name);

//         }).catch(function (error) {
//             console.log(error);
//         });
 }



var forecast5Day = $(".forecast");

function display5day() {

    // build query 
    var query5day = "https://api.openweathermap.org/data/2.5/forecast/daily?" + "q=" + cityTarget + "&appid=" + apikey;
    //clear old results
    $("#forecast-row").empty();
    $.ajax({
        url: query5day,
        method: "GET"
    })
        // store object data
        .then(function (response) {

            //create new card
            var i;
            for (i = 0; i < forecast.length; i++) {
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
                var newWeather = $("<img/>").attr({
                    class: "weather-day",
                    id: forecast[i],
                    src: eval(response.list[i].weather[0].main),
                    alt: response.list[i].weather[0].main,
                    height: "30px",
                    width: "30px",
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
                newTemp.text("Temp: " + ((response.list[i].temp.day - 273.15) * 1.80 + 32).toFixed(0) + " °F");
                newHumidity.text("Humidity: " + response.list[i].humidity + "%");
                //newWeather.text(response.list[i].weather[0].main);

            }
        }).catch(function (error) {
            console.log(error);
        });

}

displayTodaysWeather();
displayUV();
display5day(); 
