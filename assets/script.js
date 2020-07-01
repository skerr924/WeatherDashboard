
var searchTerm = "Richmond";
var APIkey = "af1fa601daa4fd5df6a18a13cf8f70d9";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + APIkey; 
var weatherData; 
var cityHeader = $(".cityHeader");


function pullWeatherData() {

    $(".infoSection").empty(); 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    
        console.log(response);
        var cityDiv = $("<div class='cityDetails'>");
        var tempF = (response.main.temp - 273.15) * 9/5 + 32; 
        var tempFRounded = Math.round(tempF * 10) / 10
        cityHeader.text(searchTerm); 
        cityDiv.text("Current temp: " + tempFRounded); 
        $(".infoSection").append(cityHeader);
        $(".infoSection").append(cityDiv);

    });

  }


//all event listeners 
$(".submitBtn").on("click", pullWeatherData) 