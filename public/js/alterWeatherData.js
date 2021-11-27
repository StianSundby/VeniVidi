function convertTodaysTemp(buttonName) {
	if (buttonName == "C" && todaysTempUnit == "F") {
		todaysTempUnit = "C";
		convertToCelsius("today", todaysTemp);
		todaysTempDiv.innerHTML = Math.round(todaysTemp);

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

function convertToFahrenheit(day, celsius) {
	if (day == "today") {
		todaysTemp = (celsius * 9) / 5 + 32;
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = (celsius * 9) / 5 + 32;
		return forecastTemp;
	} else return;
}

function convertToCelsius(day, fahrenheit) {
	if (day == "today") {
		todaysTemp = ((fahrenheit - 32) * 5) / 9;
		return todaysTemp;
	} else if (day == "forecast") {
		forecastTemp = ((fahrenheit - 32) * 5) / 9;
		return forecastTemp;
	} else return;
}
