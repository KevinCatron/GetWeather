$(document).ready(function() {
//ADDS AND REMOVES THE ANIMATE.CSS CLASSES
          function animationClick() {
              $(".main-wrap").removeClass('animated fadeInDownBig');
              $(".main-wrap").addClass('animated pulse');
              //wait for animation to finish before removing classes
              window.setTimeout( function(){
                  $(".main-wrap").removeClass('animated pulse');
              }, 2000);
          }

//DISPLAYS USERS CURRENT CITY/STATE ON LOAD
  var getIP = 'http://ip-api.com/json/';
  var currentPos = "";
  var lat = "";
  var lon = "";
  var done = "";
  var APPID = "6e500a571448cccabbf80b776a237cee";
currentPos = $.getJSON(getIP).done(function(location) {
    $('.cityText').text(location.city + ', ' + location.region);

//DISPLAYS CURRENT TEMPERATURE ON LOAD
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

   //DISPLAYS THE WEATHER ICON ON PAGE LOAD
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
//THIS WILL RUN THE CLICK EVENT WHEN THE ENTER KEY IS PRESSED.
$('.search').keypress(function(e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $('.button').click();
      return false;
    }
  });

//CLICK EVENT
$(".button").click(function() {

animationClick();
//THIS IS THE MAIN AJAX REQUEST TO GATHER ALL THE INFORMATION
  var requestData = $(".search").val();
  var resultName = $(".cityText");
  var resultTemp = $(".temp");
  var resultDesc = $(".current-desc");
  var forecast = $(".forecast");
  var windSpeed = $(".windSpeed");
  var API = "6e500a571448cccabbf80b776a237cee";
  var url = 'http://api.openweathermap.org/data/2.5/weather'
//AJAX REQUEST TO GET WEATHER INFORMATION
  $.ajax({
    url: url + "?q=" + requestData +"&appid=" + API,
    type: 'GET',
    dataType: 'jsonp',
    data: {q: requestData},
    success: function(data){
      if(data.message = null){
        resultElement.html("There was an error!")
      } else {
      resultName.html(data.name);
      resultTemp.html(Math.floor((data.main.temp * 9 / 5) - 459)+ "&deg; <span class='f'>F</span>");
      resultDesc.html(data.weather[0].description);
      windSpeed.html("WIND SPEED: " + data.wind.speed + " MPH");
      forecast.html("");
    }
  }
  });

//JSON INFORMATION FOR DISPLAYING THE WEATHER ICONS
  var iconD= "";
  var rq = "";
  var weatherIcon = $(".weatherIcon");
  rq =$.getJSON('http://api.openweathermap.org/data/2.5/weather' + '?q=' + requestData + '&callback=?' + "&appid=" + API );

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

$(".search").val("");

});//CLICK EVENT
});
});//DOCUMENT
