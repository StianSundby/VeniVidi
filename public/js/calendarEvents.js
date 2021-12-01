function standardView() {
	let buttonDisable = "disabled";
	if (daySelected) buttonDisable = "";
	document.getElementById("eventContainer").innerHTML = `
        <button class="e1b1 eventButton" type="button" ${buttonDisable}>Edit Event</button>
        <button class="e1b2 eventButton" type="button">Add new Event</button>
    `;
}
