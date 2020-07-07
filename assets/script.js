$(document).ready(function(){

  var searchTerm; 
  var city; 
  var APIkey = "af1fa601daa4fd5df6a18a13cf8f70d9";
  var cityHeader = $(".cityHeader");
  var fiveDayHeader = $(".fiveDayHeader"); 
  var lat; 
  var long; 
  var currentIcon = $(".currentWeather");
  var cities = []; 

getStoredCities(); 

  // pulls the basic current data for the information input, this provides the lat long details for a separate data pull 
  function pullBasicData() {
    $(".infoSection").empty(); 
    searchTerm = $(".searchBar").val(); 
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?zip=" + searchTerm + ",us&appid=" + APIkey, 
      method: "GET"
    }).then(function(response) {
      console.log("Pull Data Res: ", response)
        pullLatLong(response);
        pullName (response); 
    });
    
    saveCity(); 
  }

    // pulls the basic current data for previously searched item 
    function searchSideBarItem(search) {
      $(".infoSection").empty(); 
      console.log(search);
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&appid=" + APIkey, 
        method: "GET"
      }).then(function(response) {
        console.log("Pull Data Res: ", response)
          pullLatLong(response);
          pullName (response); 
      });
      
      saveCity(); 
    }
 

  //pulls the latitude and longitude data for the next API call 
  function pullLatLong (response) {
    lat = response.coord.lat;  
    long = response.coord.lon; 
    pullCompData (); 

  }  

   //pulls the city name and updates the city variable 
   function pullName (response) {
    city = response.name; 

  }  

  //pulls comprehensive data for all displays 
  function pullCompData () {
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&units=imperial&appid=" + APIkey, 
        method: "GET"
      }).then(function(response) {
          displayDetails(response);
          displayFiveDay(response);
          
      });

      console.log("pullCompData function executed"); 

    } 

  //displays all details within the city detail div 
  function displayDetails (response) {
      var cityDiv = $("<div class='cityDetails'>");
      var tempF = Math.floor(response.current.temp);
      var windSpeed = response.current.wind_speed; 
      var UVIndex = response.current.uvi; 
      var iconCode = response.current.weather[0].icon; //not working 
      console.log(iconCode);
      currentIcon.attr("src", "https://openweathermap.org/img/wn/"+ iconCode + "@2x.png") //not working 
      var currentDate = moment().format('MMMM Do YYYY, h:mm a');
      cityHeader.text("Current weather in " + city + ": " + currentDate); 
      cityDiv.html("Current temp: " + tempF + "F <br/>Wind speed: " + windSpeed + " mph<br/>UV index: "
       + UVIndex + "<br/> Humidity: " + response.current.humidity + "% <br/>Today's Forecast: " + response.current.weather[0].description); 
      $(".infoSection").append(cityHeader);
      $(".infoSection").append(cityDiv);

  }

  //displays five day data in cards 
  function displayFiveDay (response) {
    fiveDayHeader.text("5-day forecast"); 
    $(".card-panel").removeClass("invisible");
    $("#1").html("Average temp: " + Math.floor(response.daily[0].temp.day) + "F <br/>Humidity: " + response.daily[0].humidity + "%");
    $("#2").html("Average temp: " + Math.floor(response.daily[1].temp.day) + "F <br/>Humidity: " + response.daily[1].humidity + "%");
    $("#3").html("Average temp: " + Math.floor(response.daily[2].temp.day) + "F <br/>Humidity: " + response.daily[2].humidity + "%");
    $("#4").html("Average temp: " + Math.floor(response.daily[3].temp.day) + "F <br/>Humidity: " + response.daily[3].humidity + "%");
    $("#5").html("Average temp: " + Math.floor(response.daily[4].temp.day) + "F <br/>Humidity: " + response.daily[4].humidity + "%");
    
  }
  
  //saves each search to the local storage 
  function saveCity() {
    var newCity = {
      zip: searchTerm,
    }
    cities.push(newCity);
    storeCity();
  }

//adds new city searches to the local storage 
function storeCity() {
    // Stringify and set each event item in localStorage to
    localStorage.setItem("cities", JSON.stringify(cities));
}

//get stored cities from local storage 
function getStoredCities(){
    var storedCities = JSON.parse(localStorage.getItem("cities")); 
    if (storedCities == null){
        storedCities = [];
    }
    else {
        cities = storedCities;
    }
    
    renderCities(cities); 
    console.log(cities);
}


//adds each new search as a button in the sidebar below search field 
function renderCities(cities){
  var tempTerm; 

  for (i = 0; i < cities.length; i++){
    if (!cities[i].zip) {
      return; 
    }
     var newBtn = $("<button>")
     tempTerm = cities[i].zip; 
     console.log(tempTerm);
     newBtn.attr("id", tempTerm);
     newBtn.attr("class", "waves-effect waves-teal btn-flat prevSearch")
     newBtn.text(tempTerm)
     $(".recentSearches").prepend("</br>")
     $(".recentSearches").prepend(newBtn); 
     newBtn.on("click", function() {
      var zipSearch = ($(this).attr("id"));

      searchSideBarItem(zipSearch);
     }); 
  }
}

  //all event listeners 
  $(".submitBtn").on("click", pullBasicData); 

});
