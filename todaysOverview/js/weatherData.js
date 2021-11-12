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

//________________________________________________________________________________GET DATA______________________________________________________________________________

getDate(0, 2); //get todays date and time, and formats it correctly according to the API
getWeatherData(); //get and store data, primarily in responseTimeseries. But also other stuff

function getWeatherData() {
	const longitude = "lon=10.45480342151002";
	const latitude = "lat=59.27569773646279";
	const altitude = "altitude=26";
	axios
		.get(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
		)
		.then(function (response) {
			responseTimeseries = response.data.properties.timeseries;
			responseUnits = response.data.properties.meta.units;
			getCurrentTimeIndex(); //finds the index in responseTimeseries[] that corresponds with the current time
			getForecastIndex(); //find the index in responseTimeseries[] that correspons with current time + 1 day/24 hours
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getDate(dayOffset, hourOffset) {
	//first parameter is the dayOffset, which means 0 is today, 1 is tomorrow etc.
	//second parameter is the hourOffset, its 2 by default to get Norway time, so
	//decreasing to 1 means we get data from 1 hour ago.
	//parameter by default should be 2 to get Norway Time.
	let date = new Date();
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	day = parseInt(day) + dayOffset;
	let hours = date.getUTCHours() + hourOffset; //UTC == 00Z format
	hours = ("0" + hours).slice(-2); //make sure its 2 digits
	let time = hours + ":00"; //dont need minutes

	//format according to API preference, and only change relevant data
	if (dayOffset == 0) {
		currentTime = `${year}-${month}-${("0" + day).slice(-2)}T${time}:00Z`; //00Z == UTC, so 2 hours behind Norway
	} else if (dayOffset > 0) {
		forecastTime = `${year}-${month}-${("0" + day).slice(-2)}T${time}:00Z`;
	}
}
function getCurrentTimeIndex() {
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			setDataToday();
			return;
		}
	}

	getDate(0, 1); //-1 hour fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			setDataToday();
			return;
		}
	}

	getDate(0, 3); //+1 hour fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			setDataToday();
			return;
		}
	}

	getDate(0, 0); //-2 hours fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			setDataToday();
			return;
		}
	}

	getDate(0, 4); //+2 hours fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			setDataToday();
			return;
		}
	}

	console.log("No data entry for today was found");
}
function getForecastIndex() {
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			setDataForecast();
			return;
		}
	}

	getDate(1, 1); //-1 hour fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			setDataForecast();
			return;
		}
	}

	getDate(1, 3); //+1 hour fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			setDataForecast();
			return;
		}
	}

	getDate(1, 0); //-2 hours fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			setDataForecast();
			return;
		}
	}

	getDate(1, 4); //+2 hours fallback
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			setDataForecast();
			return;
		}
	}

	console.log("No data entry for tomorrow was found");
}
function getDirection(degrees) {
	let directions = [
		"North",
		"North-East",
		"East",
		"South-East",
		"South",
		"South-West",
		"West",
		"North-West",
	];
	let index =
		Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
	//Degrees = degrees / 360
	//If degrees is less than 0, degrees = degrees + 360 / 45
	//Else if degrees is more than 0, degrees = degrees / 45
	//Remove 8 from degrees until there is less than 8 left and return that number
	return directions[index];
}
//________________________________________________________________________________SET DATA______________________________________________________________________________

function setDataToday() {
	weatherCodeToday =
		responseTimeseries[todayIndex].data.next_1_hours.summary.symbol_code;
	todaysWeatherImageDiv.innerHTML = `<img src="./resources/weatherIcons/${weatherCodeToday}.svg"></img>`;

	todaysTemp =
		responseTimeseries[
			todayIndex
		].data.instant.details.air_temperature.toFixed();
	todaysTempDiv.innerHTML = todaysTemp;

	windDegrees =
		responseTimeseries[todayIndex].data.instant.details.wind_from_direction;
	windDegrees = windDegrees.toFixed(); //remove decimals

	todaysDetailsDiv.innerHTML =
		"Precipitation: " +
		responseTimeseries[todayIndex].data.next_1_hours.details
			.precipitation_amount +
		"" +
		responseUnits.precipitation_amount +
		"<br>" +
		"Humidity: " +
		responseTimeseries[todayIndex].data.instant.details.relative_humidity +
		" " +
		responseUnits.relative_humidity +
		"<br>" +
		"Wind: " +
		responseTimeseries[todayIndex].data.instant.details.wind_speed.toFixed() +
		responseUnits.wind_speed +
		" " +
		`<img src="./resources/weatherIcons/degree_arrow.svg" style="transform: rotate(${windDegrees}deg)">${getDirection(
			windDegrees
		)}</img>`;
	// +
	// responseTimeseries[todayIndex].data.instant.details.wind_from_direction +
	// responseUnits.wind_from_direction;
}

function setDataForecast() {
	weatherCodeForecast =
		responseTimeseries[forecastIndex].data.next_1_hours.summary.symbol_code;
	forecastWeatherImageDiv.innerHTML = `<img src="./resources/weatherIcons/${weatherCodeForecast}.svg"></img>`;

	forecastTemp =
		responseTimeseries[
			forecastIndex
		].data.instant.details.air_temperature.toFixed(); //remove decimals
	forecastTempDiv.innerHTML = forecastTemp;

	windDegrees =
		responseTimeseries[forecastIndex].data.instant.details.wind_from_direction;
	windDegrees = windDegrees.toFixed(); //remove decimals

	forecastDetailsDiv.innerHTML =
		"Precipitation: " +
		responseTimeseries[forecastIndex].data.next_1_hours.details
			.precipitation_amount +
		" " +
		responseUnits.precipitation_amount +
		"<br>" +
		"Humidity: " +
		responseTimeseries[forecastIndex].data.instant.details.relative_humidity +
		" " +
		responseUnits.relative_humidity +
		"<br>" +
		"Wind: " +
		responseTimeseries[
			forecastIndex
		].data.instant.details.wind_speed.toFixed() +
		responseUnits.wind_speed +
		" " +
		`<img src="./resources/icons/degree_arrow.svg" style="transform: rotate(${windDegrees}deg)">${getDirection(
			windDegrees
		)}</img>`;
}
