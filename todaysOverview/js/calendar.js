//this script uses a global variable currentTime from weatherData.js
let month; //used in buildCalendar to get the correct month. Generated in currentMonth()
let monthLength; //used in buildCalendar to get the correct amount of days. Generated in daysInMonth()
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
let isWeekend = (i) => {
	return i % 7 === 6 || i % 7 === 0; //6 is Saturday, 7 is Sunday
};

buildCalendar();
function buildCalendar() {
	daysInMonth(currentTime.slice(0, 4), currentTime.slice(5, 7)); //gets amount of days in the month
	currentMonth(); //gets the current month. Saved as a string in  "month"
	for (let i = 1; i <= monthLength; i++) {
		let weekend = isWeekend(i);

		let name = "";
		if (i <= 7) {
			let dayName = getDayName(i);
			name = `<div class="name">${dayName}</div>`;
		}

		calendar.insertAdjacentHTML(
			"beforeend",
			`<div id="${i + month}" class="day ${
				weekend ? "weekend" : ""
			}">${name}<br>${i}</div>`
		);
	}
}

//returns the short version of the day name - I.E: Mon, instead of Monday
//parameter is which day of the month is to be returned
function getDayName(i) {
	let date = new Date(
		Date(currentTime.slice(0, 4), currentTime.slice(5, 7), i)
	);
	let dayName = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
		date
	);
	return dayName;
}

//returns number of days in the current month based on what year it is
function daysInMonth(month, year) {
	monthLength = new Date(year, month, 0).getDate();
	return;
}

//overwrites month with the current month, as a string
function currentMonth() {
	const dateForMonth = new Date();
	month = monthNames[dateForMonth.getMonth()];
}

//adds and removes a class on the current day. Makes it blink.
function highlightToday() {
	let dayToHighlight = document.getElementById(currentTime.slice(5, 7) + month);
	dayToHighlight.classList.add("highlightDiv");
	setTimeout(function () {
		dayToHighlight.classList.remove("highlightDiv");
	}, 250);
	dayToHighlight.classList.toggle("selected");
}

//changes which month you're seeing
function changeMonth(direction) {}

//adds an onclick listener on all days generated in buildCalendar()
//onlick it adds a class to indicate that it has been selected
document.querySelectorAll("#calendar .day").forEach((day) => {
	day.addEventListener("click", (event) => {
		event.currentTarget.classList.toggle("selected");
	});
});

//TODO: funksjonen på linje 79, for å bytte måned
//TODO: legge til events på en dag
//TODO: faste events på mange dager
//TODO: events med reminder
//TODO: vise events på kalendern

//TODO: lagre de i en backend???
//TODO: da må jeg ha en login...0Auth? Google Authentication?
