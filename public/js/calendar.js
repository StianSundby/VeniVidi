let currentYear = currentTime.slice(0, 4); //same as above, but also used in buildCalendar()
currentMonth();
function buildCalendar() {
	removeAllChildNodes(calendar); //removes all children. Used for rebuilding the calendar when changing month
	if (monthLength == null || undefined) {
		//just ran at initilization
		daysInMonth(currentYear, parseInt(currentTime.slice(5, 7))); //First parameter is year, second is month
	} else {
		daysInMonth(currentYear, selectedMonth);
	}

	for (let i = 1; i <= monthLength; i++) {
		if (i % 7 === 6 || i % 7 === 0) {
			//marks day 6 and 7 of the week as weekend
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
		//35 is the amount of cells needed to fill 5 rows.
		"beforeend",
		`<div
			style="width:${(35 - monthLength) * 100}%;" 
			id="eventContainer"> 

		</div>`
	);
	standardView();

	//adds an onclick listener on all days generated in buildCalendar()
	//onlick it adds a class to indicate that it has been selected
	document.querySelectorAll("#calendar .day").forEach((day) => {
		day.addEventListener("click", (event) => {
			event.currentTarget.classList.toggle("selected");
			disableEdit();
		});
	});
}

/**
 *
 * @param {number} i which day of the month is to be returned
 * @returns the short version of the day name - I.E: Mon, instead of Monday
 */
function getDayName(i) {
	return dayNames[i - 1]; //i starts at 1, so -1 to get 0 index
}

/**
 *
 * @param {number} year which year is used to generate the data
 * @param {number} selectedMonth which month is used to generate the data. Always uses the month the user is currently seeing
 * @returns number of days in the current month based on what year it is
 */
function daysInMonth(year, selectedMonth) {
	monthLength = new Date(year, selectedMonth, 0).getDate();
	return;
}

//called from the buttons above the calendar
//finds the correct index in monthNames[] to display
//changes year when nessecary
/**
 *
 * @param {string} plusOrMinus either "+" or "-" based on which button called the function
 */
function currentMonth(plusOrMinus) {
	if (selectedMonth == undefined || null) {
		//gets current month
		selectedMonth = parseInt(currentTime.slice(5, 7));
	} else if (selectedMonth == 1 && plusOrMinus == "-") {
		//sends you back a year if you -1 when in January
		currentYear = parseInt(currentYear) - 1;
		selectedMonth = 12;
	} else if (selectedMonth == 12 && plusOrMinus == "+") {
		//1 year forward if you +1 when in December
		currentYear = parseInt(currentYear) + 1;
		selectedMonth = 1;
	} else {
		selectedMonth = selectedMonth + Number(plusOrMinus + 1);
	}
	month = monthNames[selectedMonth - 1];
	monthAndYearDiv.innerHTML = month + " " + currentYear;
	buildCalendar(); //spooki callstack
}

//adds and removes a class on the current day. 9 lines of code to make it blink...
//it first resets the view to the current month and year before it highlights the day
function highlightToday() {
	selectedMonth = null;
	currentYear = new Date().getFullYear();
	currentMonth();
	let dayToHighlight = document.getElementById("C" + currentTime.slice(8, 10));
	dayToHighlight.classList.add("highlightDiv");
	setTimeout(function () {
		dayToHighlight.classList.remove("highlightDiv");
	}, 250);
	dayToHighlight.click(); //click to toggle .selected class
}

//disable the edit button if no day is selected, or if more than one day is selected.
//enable it if there is one singular day selected.
function disableEdit() {
	let count = 0;
	document.querySelectorAll("#calendar .day").forEach((day) => {
		if (day.classList.contains("selected")) {
			count++;
		}
	});
	if (count === 1) {
		daySelected = true;
	} else if (count > 1 || count < 1) {
		daySelected = false;
	}
	standardView();
}

//removes all children of the element sent as parameter
//used to remove all calendar squares when changing month
/**
 *
 * @param {HTMLElement} parent which element you want to remove all children from
 */
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
