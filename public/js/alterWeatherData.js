//converts the current temperature to either Celsius or Fahrenheit, depending
/**
 *
 * @param {string} buttonName can be either "C" or "F" based on what button called the function. Used to swap between Celsius and Fahrenheit conversion
 */
function convertTodaysTemp(buttonName) {
	if (buttonName == "C" && todaysTempUnit == "F") {
		todaysTempUnit = "C";
		convertToCelsius("today", todaysTemp);
		todaysTempDiv.innerHTML = Math.round(todaysTemp); //removes decimals. Rounds to the nearest.

		todayCelsiusButton.classList.add("activeButton");
		todayFahrenheitButton.classList.remove("activeButton");
	} else if (buttonName == "F" && todaysTempUnit == "C") {
		todaysTempUnit = "F";
		convertToFahrenheit("today", todaysTemp);
		todaysTempDiv.innerHTML = Math.round(todaysTemp);

		todayCelsiusButton.classList.remove("activeButton");
		todayFahrenheitButton.classList.add("activeButton");
	}
}

//same as above, but converts the forecast temperature
/**
 *
 * @param {string} buttonName can be either "C" or "F" based on what button called the function. Used to swap between Celsius and Fahrenheit conversion
 */
function convertForecastTemp(buttonName) {
	if (buttonName == "C" && forecastTempUnit == "F") {
		forecastTempUnit = "C";
		convertToCelsius("forecast", forecastTemp);
		forecastTempDiv.innerHTML = Math.round(forecastTemp);

		forecastCelsiusButton.classList.add("activeButton");
		forecastFahrenheitButton.classList.remove("activeButton");
	} else if (buttonName == "F" && forecastTempUnit == "C") {
		forecastTempUnit = "F";
		convertToFahrenheit("forecast", forecastTemp);
		forecastTempDiv.innerHTML = Math.round(forecastTemp);

		forecastCelsiusButton.classList.remove("activeButton");
		forecastFahrenheitButton.classList.add("activeButton");
	}
}

//converts celsius to fahrenheit
/**
 *
 * @param {string} day Can be either "today" or "forecast" based on which button called the function. Used to select which temperature to convert
 * @param {number} celsius degrees in Celsius, to be converted to Fahrenheit
 * @returns {number} the converted temperature
 */
function convertToFahrenheit(day, celsius) {
	if (day == "today") {
		todaysTemp = (celsius * 9) / 5 + 32;
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = (celsius * 9) / 5 + 32;
		return forecastTemp;
	} else return;
}

//converts fahrenheit to celsius
/**
 *
 * @param {string} day Can be either "today" or "forecast" based on which button called the function. Used to select which temperature to convert
 * @param {number} fahrenheit degrees in Fahrenheit, to be converted to Celsius
 * @returns {number} the converted temperature
 */
function convertToCelsius(day, fahrenheit) {
	if (day == "today") {
		todaysTemp = ((fahrenheit - 32) * 5) / 9;
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = ((fahrenheit - 32) * 5) / 9;
		return forecastTemp;
	} else return;
}
