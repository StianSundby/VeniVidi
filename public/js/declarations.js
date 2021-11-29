//______________________________________________________________________________weatherdata.js_________________________________________________________________________
var todaysTempDiv = document.getElementById("todaysWeatherTemp");
var forecastTempDiv = document.getElementById("forecastWeatherTemp");
var todaysDetailsDiv = document.getElementById("todaysDetails");
var forecastDetailsDiv = document.getElementById("forecastDetails");
var todaysWeatherImageDiv = document.getElementById("todaysWeatherImage");
var forecastWeatherImageDiv = document.getElementById("forecastWeatherImage");

let responseTimeseries = []; //fetched in getWeatherData()
let responseUnits; //measurement units

let currentTime; //generated in getDate()
let forecastTime; //generated in getDate()

let todayIndex; //stores the index in responseTimeseries[] that corresponds with the current time
let forecastIndex; //stores the index in responseTimeseries[] that corresponds with the current time + 1 day/24 hours

let weatherCodeToday; //used to find correct image
let weatherCodeForecast; //used to find correct image

var todaysTemp; //stores temperature for conversion
var forecastTemp; //stores temperature for conversion

let longitude; //stores coordinates for weatherData. Used with Yr API
let latitude; //  --||--
let altitude; //  --||-- generated with Open-Elevation API
//
//
//
//
//______________________________________________________________________________alterWeatherData.js_________________________________________________________________________
let todayCelsiusButton = document.getElementById("todayCelsiusButton");
let todayFahrenheitButton = document.getElementById("todayFahrenheitButton");
var todaysTempUnit = "C"; //stores temperature unit for conversion. Celsius by default
var forecastTempUnit = "C"; //same as above
//
//
//
//
//______________________________________________________________________________calendar.js___________________________________________________________________________
let monthAndYearDiv = document.getElementById("monthAndYearDiv");
let calendar = document.querySelector("#calendar"); //every div with id="calendar"
let month; //used in buildCalendar to get the correct month. Generated in currentMonth()
let monthLength; //used in buildCalendar to get the correct amount of days. Generated in daysInMonth()
let selectedMonth; //used in currentMonth(). Just saved to change month forward or back. Note that this starts at 0, so December is 11 not 12
let weekend = false;
let dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
