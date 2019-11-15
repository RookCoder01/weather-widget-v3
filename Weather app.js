var APPID = "0a6468f0d54dc2b80d78b5100ba1862d";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;



function updateByZip(zip) {
    var url = "https://api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zip +
        "&APPID=" + APPID;
    sendRequest (url);
}

function updateByGeo(lat, lon){
    var url = "https://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
          //  weather.icon = data.weather[0].id;
          //  weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.direction = data.wind.deg;
         //   weather.loc = data.name;
           // weather.temp = data.main.temp;
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function degreesToDirection(degrees) {
   var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = [ "N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
       if (degrees >= low && degrees < high)
            return angles[i];

      /*  low = (low + range) % 360;
        high = (high + range) % 360; */
    }
    return "N";
}


function update(weather) {
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
   humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
}

function showPosition(position){
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
   // temp = document.getElementById("temperature");
  //  loc = document.getElementById("location");
   // icon = document.getElementById("icon");
  //  humidity = document.getElementById("location");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    if(!navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        var zip = window.prompt("Could not find your location. Enter zip code");
        updateByZip(zip);
    }
};
/* The zip for location, cayman doesn't have a valid zip so i dont know where to g from here :( */


/* this is declaring the json data, it isnt necessary as i did not link the json data */
/*    var weather = {};
    weather.wind = 4.1;
    weather.humidity = 81;
    weather.direction = "NE";
    weather.loc = "Cayman";
    weather.temp = "45";
    weather.icon = "Raindrops-png.png";
update(weather); */
