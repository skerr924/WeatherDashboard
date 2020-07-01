
// var searchTerm = "Richmond";
// var APIkey = "af1fa601daa4fd5df6a18a13cf8f70d9";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Richmond&appid=af1fa601daa4fd5df6a18a13cf8f70d9"
var weatherData; 

function pullWeatherData() {

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the city details 
      // var cityDiv = $("<div class='cityDetails'>");
        console.log(response); 

    });

  }


//all event listeners 
$(".submitBtn").on("click", pullWeatherData) 