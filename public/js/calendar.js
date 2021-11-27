let currentYear = currentTime.slice(0, 4); //same as above, but also used in buildCalendar()
currentMonth();
function buildCalendar() {
	removeAllChildNodes(calendar);
	if (monthLength == null || undefined) {
		daysInMonth(currentYear, parseInt(currentTime.slice(5, 7))); //First parameter is year, second is month
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
	//TODO: OCD
	calendar.insertAdjacentHTML(
		//filler at the end. Used for buttons manipulating events
		"beforeend",
		`<div
			style="width:${(35 - monthLength) * 100}%;" 
			id="addEvent"> 

		</div>`
	);
}

//returns the short version of the day name - I.E: Mon, instead of Monday
//parameter is which day of the month is to be returned
function getDayName(i) {
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
function currentMonth(plusOrMinus) {
	if (selectedMonth == undefined || null) {
		//gets current month
		selectedMonth = parseInt(currentTime.slice(5, 7));
	} else if (selectedMonth == 1 && plusOrMinus == "-") {
		//sends you back a year if you -1 when in January
		currentYear = currentYear - 1;
		selectedMonth = 12;
	} else if (selectedMonth == 12 && plusOrMinus == "+") {
		//1 year forward if you +1 when in December
		currentYear = currentYear + 1;
		selectedMonth = 1;
	} else {
		selectedMonth = selectedMonth + Number(plusOrMinus + 1);
	}
	month = monthNames[selectedMonth - 1];
	monthAndYearDiv.innerHTML = month + " " + currentYear;
	buildCalendar(); //spooki callstack
}

//adds and removes a class on the current day. 7 lines of code to make it blink...
//it first resets the view to the current month and year before it highlights the day
function highlightToday() {
	selectedMonth = null;
	currentMonth();
	let dayToHighlight = document.getElementById("C" + currentTime.slice(8, 10));
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
