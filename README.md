# GetWeather
GetWeather is a quick and easy solution to get all your weather needs!
<br><br>
#Into The Code
Working with the openweathermap.org API was a good learning experience that really showed how involved you can get with the API world. I wanted to create an easy to use simple weather app, keeping it visually simple was also a goal of mine.

When the page first loads it grabs the users coordinates using the code below:
```
var getIP = 'http://ip-api.com/json/';
  var currentPos = "";
  var lat = "";
  var lon = "";
  var done = "";
  var APPID = "6e500a571448cccabbf80b776a237cee";
currentPos = $.getJSON(getIP).done(function(location) {
    $('.cityText').text(location.city + ', ' + location.region);
   ```
   Then when the user clicks the seach button with a location in the inputfield the JSON gets parsed with:
   ```
     var lat = location.lat;
  var lon = location.lon;
  var units = 'metric';
  var loadName = $(".cityText");
  var loadTemp = $(".temp");
  var loadDesc = $(".current-desc");
  var loadForecast = $(".forecast");
  var loadWindSpeed = $(".windSpeed");
  var APPID = "6e500a571448cccabbf80b776a237cee";
  var weather = "";
  var data = "";
  var temp = "http://api.openweathermap.org/data/2.5/weather"+"?lat="+lat+"&lon="+lon+"&appid="+APPID;
currentTemp = $.getJSON(temp).done(function(weather) {
    loadTemp.html(Math.round((weather.main.temp * 9 / 5) - 459) + "&deg; <span class='f'>F</span>");
    loadWindSpeed.html("WIND SPEED: " + weather.wind.speed + " MPH");
    loadDesc.html(weather.weather[0].description);
   });
   ```
   This will display the current temperatre and wind speed into the DOM.
   
   I found a cool set of icons called Weather-Icons here in GitHub. The cool thing about these icons is that they have an API that matches openweathermaps API for displaying icons. These icons were alot more appealing to the eye in my opinion. Getting these icons to show up at the right time and temperature was a challenge for me. I was able to achieve getting the icons displayed with:
   ```
   var iconD= "";
  var rq = "";
  var weatherIcon = $(".weatherIcon");
  rq =$.getJSON("http://api.openweathermap.org/data/2.5/weather"+"?lat="+lat+"&lon="+lon+"&callback=?" + "&appid="+ APPID);

  rq.then(function(rsp){
  var prefix = "wi wi-";
  var today = new Date();
  var hour = today.getHours();

  if (hour > 6 && hour < 20) {
    //Day time
    dorn = "day-";
  } else {
    //Night time
    dorn ="night-";
  }

    var code = rsp.weather[0].id;
    iconD = prefix + "owm-" +dorn+ code;
    //DISPLAYS THE CORRECT WEATHER ICON INTO THE DOM
    weatherIcon.html("<i class='wi wi-owm-" + dorn + code + "'></i>");
});
```
#Technology Used

*BootStrap

*JavaScript

*jQuery

*SASS/SCSS

#Problems?
The only problem that I think I vould have done differently or improved on is $GetJSON calls. I had to do one to get the users coordinates for the document.load. Then another for the actual click event, then one more to get the weather icons to appear correctly. I'm sure thre is a way to do it all in one call but I haven't found an efficient way..yet..


