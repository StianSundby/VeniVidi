let todayCelsiusButton = document.getElementById("todayCelsiusButton");
let todayFahrenheitButton = document.getElementById("todayFahrenheitButton");
var todaysTempUnit = "C"; //stores temperature unit for conversion. Celsius by default
var forecastTempUnit = "C";

function convertTodaysTemp(buttonName) {
	if (buttonName == "C" && todaysTempUnit == "F") {
		todaysTempUnit = "C";
		convertToCelsius("today", todaysTemp);
		todaysTempDiv.innerHTML = todaysTemp;

		todayCelsiusButton.classList.add("activeButton");
		todayFahrenheitButton.classList.remove("activeButton");
	} else if (buttonName == "F" && todaysTempUnit == "C") {
		todaysTempUnit = "F";
		convertToFahrenheit("today", todaysTemp);
		todaysTempDiv.innerHTML = todaysTemp;

		todayCelsiusButton.classList.remove("activeButton");
		todayFahrenheitButton.classList.add("activeButton");
	}
}

function convertForecastTemp(buttonName) {
	if (buttonName == "C" && forecastTempUnit == "F") {
		forecastTempUnit = "C";
		convertToCelsius("forecast", forecastTemp);
		forecastTempDiv.innerHTML = forecastTemp;

		forecastCelsiusButton.classList.add("activeButton");
		forecastFahrenheitButton.classList.remove("activeButton");
	} else if (buttonName == "F" && forecastTempUnit == "C") {
		forecastTempUnit = "F";
		convertToFahrenheit("forecast", forecastTemp);
		forecastTempDiv.innerHTML = forecastTemp;

		forecastCelsiusButton.classList.remove("activeButton");
		forecastFahrenheitButton.classList.add("activeButton");
	}
}

function convertToFahrenheit(day, celsius) {
	if (day == "today") {
		todaysTemp = (celsius * 9) / 5 + 32;
		// todaysTemp = Math.trunc(todaysTemp);
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = (celsius * 9) / 5 + 32;
		// forecastTemp = Math.trunc(forecastTemp);
		//gjøre matte med alle deimaler - lage en egen "vise fram " variabel uten desimaler
		return forecastTemp;
	} else return;
}

function convertToCelsius(day, fahrenheit) {
	if (day == "today") {
		todaysTemp = ((fahrenheit - 32) * 5) / 9;
		// todaysTemp = Math.trunc(todaysTemp);
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = ((fahrenheit - 32) * 5) / 9;
		// forecastTemp = Math.trunc(forecastTemp);
		return forecastTemp;
	} else return;
}
