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

function checkTime(unit) {
	if (unit < 10) {
		unit = "0" + unit;
	}
	return unit;
}
