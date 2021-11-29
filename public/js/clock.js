//clock at the top of the app
function startTime() {
	const today = new Date();
	let hours = today.getHours();
	let minutes = today.getMinutes();
	let seconds = today.getSeconds();
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;
	setTimeout(startTime, 1000);
}

//if the parameter is a single digit, add a 0 infront
/**
 *
 * @param {number} unit can be either the current amount of minutes or seconds
 * @returns 00-09. Just adds a 0 infront of the number sent as a parameter if it is a single digit
 */
function checkTime(unit) {
	if (unit < 10) {
		unit = "0" + unit;
	}
	return unit;
}
