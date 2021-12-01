//________________________________________________________________________________GET DATA______________________________________________________________________________
getLocation(); //get and store data, primarily in responseTimeseries. But also other stuff
getDate(0, 1); //get todays date and time, and formats it correctly according to the API
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getAltitude, showGetLocationError);
	} else {
		alert("Geolocation is not supported by this browser");
	}
}

/**
 *
 * @param {error.code} error error.code passed from getLocation() if anything goes wrong
 */
function showGetLocationError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occured");
			break;
	}
}

/**
 *
 * @param {JSON} position contains coordinates and a timestamp. We only need the coordinates. Generated in getLocation()
 */
function getAltitude(position) {
	axios
		.get(
			`https://api.open-elevation.com/api/v1/lookup?locations=${position.coords.latitude},${position.coords.longitude}`
		)
		.then(function (response) {
			altitude = "altitude=" + response.data.results[0].elevation;
			longitude = "lon=" + position.coords.longitude;
			latitude = "lat=" + position.coords.latitude;
			getWeatherData();
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getWeatherData() {
	axios
		.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`)
		.then(function (response) {
			responseTimeseries = response.data.properties.timeseries;
			responseUnits = response.data.properties.meta.units;
			console.log(response);
			getCurrentTimeIndex(); //finds the index in responseTimeseries[] that corresponds with the current time
			getForecastIndex(); //find the index in responseTimeseries[] that correspons with current time + 1 day/24 hours
		})
		.catch(function (error) {
			console.log(error);
		});
}

/**
 *
 * @param {number} dayOffset is used to get JSON from other timestamps, such as from tomorrow instead of today
 * @param {number} hourOffset is used to convert from UTC to local time. Value is hardcoded for now. Also used to get JSON from other timestamps, such as 1-2 hours forward or back
 */
function getDate(dayOffset, hourOffset) {
	//first parameter is the dayOffset, which means 0 is today, 1 is tomorrow etc.
	//second parameter is the hourOffset, its 2 by default to get Norway time, so
	//decreasing to 1 means we get data from 1 hour ago.
	//parameter by default should be 2 to get Norway Time.
	let date = new Date();
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let daysInMonth = new Date(year, month, 0).getDate();
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

	//when this function is called, make sure we actually get the day we're after
	//if its the last day of the month, we need to change some stuff
	if (day == daysInMonth && dayOffset > 0) {
		day = 1 + dayOffset; //set the day to the first of the month
		if (month == 12) {
			//if its december
			month = 1; //make it january, not month 13
			year = parseInt(year) + 1; //add 1 year aswell
		} else {
			month = parseInt(month) + 1; //just add 1 month
		}
	}
	let hours = date.getUTCHours() + hourOffset; //UTC == 00Z format
	hours = ("0" + hours).slice(-2); //make sure its 2 digits
	let time = hours + ":00"; //dont need minutes

	//format according to API preference, and only change relevant data
	if (dayOffset == 0) {
		currentTime = `${year}-${month}-${("0" + day).slice(-2)}T${time}:00Z`; //00Z == UTC, so 1 hours behind Norway
	} else if (dayOffset > 0) {
		forecastTime = `${year}-${month}-${("0" + day).slice(-2)}T${time}:00Z`;
	}
}

/**
 *
 * @returns the correct responseTimeseries index in the Yr API JSON. Containing the relevant weather data for today
 */
function getCurrentTimeIndex() {
	todayCounter++;
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			todayIndex = i;
			todayCounter = 0;
			setDataToday();
			return;
		}
	}
	if (todayCounter === 1) getDate(0, 2); //+1 hour fallback
	if (todayCounter === 2) getDate(0, 0); //-1 hours fallback
	if (todayCounter === 3) getDate(0, 3); //+2 hour fallback
	if (todayCounter === 4) getDate(0, -1); //-2 hours fallback
	if (todayCounter === 5) getDate(0, 4); //+3 hours fallback
	if (todayCounter === 6) getDate(0, -2); //-3 hours fallback
	if (todayCounter === 7) getDate(0, 5); //+4 hours fallback
	if (todayCounter === 8) getDate(0, -3); //-4 hours fallback
	if (todayCounter === 9) {
		console.log("No data entry for today was found");
		return;
	}
	getCurrentTimeIndex();
}

/**
 *
 * @returns the correct responseTimeseries index in the Yr API JSON. Containing the relevant weather data for tomorrow
 */
function getForecastIndex() {
	forecastCounter++;
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == forecastTime) {
			forecastIndex = i;
			forecastCounter = 0;
			setDataForecast();
			return;
		}
	}

	if (forecastCounter === 1) getDate(1, 2); //+1 hour fallback
	if (forecastCounter === 2) getDate(1, 0); //-1 hours fallback
	if (forecastCounter === 3) getDate(1, 3); //+2 hour fallback
	if (forecastCounter === 4) getDate(1, -1); //-2 hours fallback
	if (forecastCounter === 5) getDate(1, 4); //+3 hours fallback
	if (forecastCounter === 6) getDate(1, -2); //-3 hours fallback
	if (forecastCounter === 7) getDate(1, 5); //+4 hours fallback
	if (forecastCounter === 8) getDate(1, -3); //-4 hours fallback
	if (forecastCounter === 9) {
		console.log("No data entry for tomorrow was found");
		return;
	}
	getForecastIndex();
}

/**
 *
 * @param {number} degrees where the wind is coming from in degrees. Fetched from the weatherdata JSON
 * @returns {string} a string containing the correct direction based on the parameter
 */
function getDirection(degrees) {
	let directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
	let index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
	//Degrees = degrees / 360
	//If degrees is less than 0, degrees = degrees + 360 / 45
	//Else if degrees is more than 0, degrees = degrees / 45
	//Remove 8 from degrees until there is less than 8 left and return that number
	return directions[index];
}
//
//
//
//
//________________________________________________________________________________SET DATA______________________________________________________________________________

function setDataToday() {
	weatherCodeToday = responseTimeseries[todayIndex].data.next_1_hours.summary.symbol_code;
	todaysWeatherImageDiv.innerHTML = `<img src="./resources/weatherIcons/${weatherCodeToday}.svg"></img>`;

	todaysTemp = responseTimeseries[todayIndex].data.instant.details.air_temperature.toFixed();
	todaysTempDiv.innerHTML = todaysTemp;

	windDegrees = responseTimeseries[todayIndex].data.instant.details.wind_from_direction;
	windDegrees = windDegrees.toFixed(); //remove decimals

	todaysDetailsDiv.innerHTML =
		"Precipitation: " +
		responseTimeseries[todayIndex].data.next_1_hours.details.precipitation_amount +
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
		`<img src="./resources/icons/degree_arrow.svg" style="transform: rotate(${windDegrees}deg)">${getDirection(
			windDegrees
		)}</img>`;
}

function setDataForecast() {
	weatherCodeForecast = responseTimeseries[forecastIndex].data.next_1_hours.summary.symbol_code;
	forecastWeatherImageDiv.innerHTML = `<img src="./resources/weatherIcons/${weatherCodeForecast}.svg"></img>`;

	forecastTemp = responseTimeseries[forecastIndex].data.instant.details.air_temperature.toFixed(); //remove decimals
	forecastTempDiv.innerHTML = forecastTemp;

	windDegrees = responseTimeseries[forecastIndex].data.instant.details.wind_from_direction;
	windDegrees = windDegrees.toFixed(); //remove decimals

	forecastDetailsDiv.innerHTML =
		"Precipitation: " +
		responseTimeseries[forecastIndex].data.next_1_hours.details.precipitation_amount +
		" " +
		responseUnits.precipitation_amount +
		"<br>" +
		"Humidity: " +
		responseTimeseries[forecastIndex].data.instant.details.relative_humidity +
		" " +
		responseUnits.relative_humidity +
		"<br>" +
		"Wind: " +
		responseTimeseries[forecastIndex].data.instant.details.wind_speed.toFixed() +
		responseUnits.wind_speed +
		" " +
		`<img src="./resources/icons/degree_arrow.svg" style="transform: rotate(${windDegrees}deg)">${getDirection(
			windDegrees
		)}</img>`;
}
