
$(document).ready(function(){

  var searchTerm;
  var APIkey = "af1fa601daa4fd5df6a18a13cf8f70d9";
  var cityHeader = $(".cityHeader");
  var fiveDayHeader = $(".fiveDayHeader"); 
  var dayOneTempSum = 0;
  var dayTwoTempSum = 0;
  var dayThreeTempSum = 0;
  var dayFourTempSum = 0;
  var dayFiveTempSum = 0;

  // pulls current day weather data by city search term from the openweather api
  function pullWeatherData() {
      searchTerm = $(".searchBar").val(); 
      console.log(searchTerm);
      $(".infoSection").empty(); 

      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + searchTerm + ",us&appid=" + APIkey, 
        method: "GET"
      }).then(function(response) {
          displayDetails(response);
      });

    }

  // pulls weather 5 day weather data by city search term from the openweather api
  function pullFiveDay() {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/forecast?q=" + + searchTerm + ",us&appid=" + APIkey, 
      method: "GET"
    }).then(function(response) {
      
        displayFiveDay(response);

    });

  }

  //function allows for easily adding line breaks in element text line additions
  $.fn.multiline = function(text){
      this.text(text);
      this.html(this.html().replace(/\n/g,'<br/>'));
      return this;
  }

  //displays all details within the city detail div 
  function displayDetails (response) {
      console.log(response);
      var cityDiv = $("<div class='cityDetails'>");
      var tempF = (response.main.temp - 273.15) * 9/5 + 32; 
      var tempFRounded = Math.round(tempF * 10) / 10
      var tempHigh = (response.main.temp_max - 273.15) * 9/5 + 32; 
      var tempHighRounded = Math.round(tempHigh * 10) / 10; 
      var tempLow = (response.main.temp_min - 273.15) * 9/5 + 32; 
      var tempLowRounded = Math.round(tempLow * 10) / 10 ; 
      cityHeader.text("Current weather: " + response.name); 
      cityDiv.multiline("Current temp: " + tempFRounded + "F \nHigh Temp: " + tempHighRounded + "F \nLow Temp: "
      + tempLowRounded + "F \n Humidity: " + response.main.humidity + "% \nToday's Forecast: " + response.weather[0].main); 
      $(".infoSection").append(cityHeader);
      $(".infoSection").append(cityDiv);

  }

  //displays five day data in cards 
  function displayFiveDay (response) {
    console.log(response);
    fiveDayHeader.text("5-day forecast: " + response.city.name); 

    for (i = 0; i< 8; i++) {
      dayOneTempSum += response.list[i].main.temp;
    }

    for (i = 8; i< 16; i++) {
      dayTwoTempSum += response.list[i].main.temp;
    }

    for (i = 16; i< 24; i++) {
      dayThreeTempSum += response.list[i].main.temp;
    }

    for (i = 24; i< 32; i++) {
      dayFourTempSum += response.list[i].main.temp;
    }

    for (i = 32; i< 40; i++) {
      dayFiveTempSum += response.list[i].main.temp;
    }
    
    var dayOneTempAverage = (dayOneTempSum / 8);  
    var dayTwoTempAverage = (dayTwoTempSum / 8);
    var dayThreeTempAverage = (dayThreeTempSum / 8);
    var dayFourTempAverage = (dayFourTempSum / 8);
    var dayFiveTempAverage = (dayFiveTempSum / 8);
    var tempOne = cleanTemps(dayOneTempAverage);
    var tempTwo = cleanTemps(dayTwoTempAverage);
    var tempThree = cleanTemps(dayThreeTempAverage);
    var tempFour = cleanTemps(dayFourTempAverage);
    var tempFive = cleanTemps(dayFiveTempAverage);

    console.log (tempOne, tempTwo,  tempThree, tempFour, tempFive); 
    
  }

  function cleanTemps (K) {
    var cleanNumber = Math.round(((K - 273.15) * 9/5 + 32) * 10) / 10; 
    return(cleanNumber);
  }


  //   <div class="col s12 m2">
  //   <div class="card-panel teal">
  //     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
  //     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
  //     </span>
  //   </div>
  // </div>
  // <div class="col s12 m2">
  //   <div class="card-panel teal">
  //     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
  //     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
  //     </span>
  //   </div>
  // </div>
  // <div class="col s12 m2">
  //   <div class="card-panel teal">
  //     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
  //     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
  //     </span>
  //   </div>
  // </div>
  // <div class="col s12 m2">
  //   <div class="card-panel teal">
  //     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
  //     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
  //     </span>
  //   </div>
  // </div>
  // <div class="col s12 m2">
  //   <div class="card-panel teal">
  //     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
  //     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
  //     </span>
  //   </div>
  // </div>


  //all event listeners 
  $(".submitBtn").on("click", pullWeatherData); 
  $(".submitBtn").on("click", pullFiveDay); 

});