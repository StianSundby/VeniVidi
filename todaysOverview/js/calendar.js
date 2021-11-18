//this script uses a global variable currentTime from weatherData.js
let monthAndYearDiv = document.getElementById("monthAndYearDiv");
let calendar = document.querySelector("#calendar");
let month; //used in buildCalendar to get the correct month. Generated in currentMonth()
let monthLength; //used in buildCalendar to get the correct amount of days. Generated in daysInMonth()
let selectedMonth; //used in currentMonth(). Just saved to change month forward or back. Note that this starts at 0, so December is 11 not 12
let currentYear = currentTime.slice(0, 4); //same as above, but also used in buildCalendar()
let weekend = false;
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

currentMonth();
function buildCalendar() {
	removeAllChildNodes(calendar);
	if (monthLength == null || undefined) {
		daysInMonth(currentYear, currentTime.slice(5, 7)); //First parameter is year, second is month
	} else {
		daysInMonth(currentYear, selectedMonth);
	}

	for (let i = 1; i <= monthLength; i++) {
		if (i % 7 === 6 || i % 7 === 0) {
			weekend = true;
		} else weekend = false;

		let name = "";
		if (i <= 7) {
			//marks the first 7 days with dayName
			let dayName = getDayName(i);
			name = `<div class="name">${dayName}</div>`;
		}

		calendar.insertAdjacentHTML(
			"beforeend",
			`<div 
				id="${"C" + i}" 
				class="day ${weekend ? "weekend" : ""}"
				>${name}
				<br>
				${i}
			</div>`
		);
	}
	calendar.insertAdjacentHTML(
		//filler at the end. Used for buttons manipulating events
		"beforeend",
		`<div
			style="width:${(35 - monthLength) * 100}%; " 
			id="addEvent">

		</div>`
	);
}

//returns the short version of the day name - I.E: Mon, instead of Monday
//parameter is which day of the month is to be returned
function getDayName(i) {
	let dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	return dayNames[i - 1]; //i starts at 1, so -1 to get 0 index
}

//returns number of days in the current month based on what year it is
function daysInMonth(year, selectedMonth) {
	monthLength = new Date(year, selectedMonth, 0).getDate();
	return;
}

//called from the buttons above the calendar
//finds the correct index in monthNames[] to display
//changes year when nessecary
//TODO: Denne bytter ikke år
function currentMonth(plusOrMinus) {
	console.log(selectedMonth);
	if (selectedMonth == undefined || null) {
		//gets current month
		selectedMonth = new Date().getMonth();
	} else if (selectedMonth == 0 && plusOrMinus == "-") {
		//sends you back a year if you -1 when in January
		currentYear = currentYear - 1;
		selectedMonth = 11;
	} else if (selectedMonth == 11 && plusOrMinus == "+") {
		//1 year forward if you +1 when in December
		currentYear = currentYear++;
		selectedMonth = 0;
	} else {
		selectedMonth = selectedMonth + Number(plusOrMinus + 1);
	}
	month = monthNames[selectedMonth];
	monthAndYearDiv.innerHTML = month + " " + currentYear;
	console.log(currentYear);
	buildCalendar(); //spooki callstack
}

//adds and removes a class on the current day. 7 lines of code to make it blink...
//TODO: Denne fungerer ikke lenger..
function highlightToday() {
	let dayToHighlight = document.getElementById(currentTime.slice(5, 7) + month);
	dayToHighlight.classList.add("highlightDiv");
	setTimeout(function () {
		dayToHighlight.classList.remove("highlightDiv");
	}, 250);
	dayToHighlight.classList.toggle("selected");
}

//removes all children of the element sent as parameter
//used to remove all calendar squares when changing month
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//adds an onclick listener on all days generated in buildCalendar()
//onlick it adds a class to indicate that it has been selected
document.querySelectorAll("#calendar .day").forEach((day) => {
	day.addEventListener("click", (event) => {
		event.currentTarget.classList.toggle("selected");
	});
});
//TODO: riktig antall dager i hver måned. Skal genereres ettersom hvilken måned som er valgt
//TODO: legge til events på en dag <--- Events burde kanskje være en klasse? new Event("") constructors..
// function addEvent(ss){ new Event(date, repeat, )}
// function showEventCurrentMonth()
//TODO: vise events på kalendern
//TODO: faste events på mange dager
//TODO: events med reminder

//TODO: lagre de i en backend???
//TODO: da må jeg ha en login...0Auth? Google Authentication?

//TODO: hente værdata ut ifra lokasjon? personvern?
