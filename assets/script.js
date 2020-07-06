
$(document).ready(function(){

  var searchTerm;
  var city; 
  var APIkey = "af1fa601daa4fd5df6a18a13cf8f70d9";
  var cityHeader = $(".cityHeader");
  var fiveDayHeader = $(".fiveDayHeader"); 
  var fiveDayDetails = $(".fiveDayDetails")
  var lat; 
  var long; 


  //function allows for easily adding line breaks in element text line additions
  $.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

  // pulls the basic current data for the information input, this provides the lat long details for a separate data pull 
  function pullBasicData() {
      searchTerm = $(".searchBar").val(); 
      $(".infoSection").empty(); 

      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + searchTerm + ",us&appid=" + APIkey, 
        method: "GET"
      }).then(function(response) {
          pullLatLong(response);
          pullName (response); 
          
      });

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
  }

  //displays all details within the city detail div 
  function displayDetails (response) {
      console.log(response);
      var cityDiv = $("<div class='cityDetails'>");
      var tempF = Math.floor(response.current.temp);
      var windSpeed = response.current.wind_speed; 
      var UVIndex = response.current.uvi; 
      var iconCode = response.current.weather[0].icon; 
      console.log(iconCode);
      var icon = $("<img>"); 
      icon.attr("href", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png")
      var currentDate = moment().format('MMMM Do YYYY, h:mm a');
      cityHeader.text("Current weather in " + city + ": " + currentDate); 
      cityDiv.multiline("Current temp: " + tempF + "F \nWind speed: " + windSpeed + " mph\nUV index: "
       + UVIndex + "\n Humidity: " + response.current.humidity + "% \nToday's Forecast: " + response.current.weather[0].description); 
      $(".infoSection").append(cityHeader);
      $(".infoSection").append(icon);
      $(".infoSection").append(cityDiv);

  }

  //displays five day data in cards 
  function displayFiveDay (response) {
    fiveDayHeader.text("5-day forecast"); 
    $(".card-panel").removeClass("invisible");
    $("#1").text("Average temp: " + Math.floor(response.daily[0].temp.day) + "F \nHumidity: " + response.daily[0].humidity + "%");
    $("#2").text("Average temp: " + Math.floor(response.daily[1].temp.day) + "F \nHumidity: " + response.daily[1].humidity + "%");
    $("#3").text("Average temp: " + Math.floor(response.daily[2].temp.day) + "F \nHumidity: " + response.daily[2].humidity + "%");
    $("#4").text("Average temp: " + Math.floor(response.daily[3].temp.day) + "F \nHumidity: " + response.daily[3].humidity + "%");
    $("#5").text("Average temp: " + Math.floor(response.daily[4].temp.day) + "F \nHumidity: " + response.daily[4].humidity + "%");
    
  }
  

  //all event listeners 
  $(".submitBtn").on("click", pullBasicData); 

});


