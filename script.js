window.addEventListener('DOMContentLoaded', (event) => {
    // Add event listeners for buttons
    document.getElementById("monthButton").addEventListener("click", function () {
        console.log("Month button clicked");
        toggleView("monthly"); // Show the Monthly Budget section
        loadDropdown("month"); // Load the dropdown options for month
    });

    document.getElementById("weekButton").addEventListener("click", function () {
        console.log("Week button clicked");
        toggleView("weekly"); // Show the Weekly Budget section
        loadDropdown("week"); // Load the dropdown options for week
    });

    // Event listener for Enter Transaction button
    document.getElementById("enterTransactionButton").addEventListener("click", function () {
        console.log("Enter Transaction button clicked");
        openForm("https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform");
    });

    // Event listener for Enter Budget button
    document.getElementById("enterBudgetButton").addEventListener("click", function () {
        console.log("Enter Budget button clicked");
        openForm("https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform");
    });

    // Initially hide all sections except the first selected one
    toggleView("monthly");
});

// Function to toggle between sections based on button click
function toggleView(view) {
    console.log(`Toggling view to: ${view}`);
    // Hide all sections
    document.getElementById("monthly-budget").style.display = "none";
    document.getElementById("weekly-budget").style.display = "none";
    document.getElementById("monthly-table").style.display = "none";
    document.getElementById("weekly-table").style.display = "none";

    // Show the selected section
    if (view === "monthly") {
        document.getElementById("monthly-budget").style.display = "block";
        document.getElementById("monthly-table").style.display = "block";
    } else if (view === "weekly") {
        document.getElementById("weekly-budget").style.display = "block";
        document.getElementById("weekly-table").style.display = "block";
    }
}

// Function to load the dropdown options based on the selected view (month or week)
function loadDropdown(type) {
    console.log(`Loading ${type} dropdown`);
    let dropdown;
    let range;
    let sheet;

    // Select the dropdown element based on type
    if (type === "month") {
        dropdown = document.getElementById("monthlyDropdown");
        sheet = "month";
        range = "A3:A19"; // Range for months
    } else if (type === "week") {
        dropdown = document.getElementById("weeklyDropdown");
        sheet = "Entry";
        range = "A3:A19"; // Range for weeks
    }

    // Clear existing options
    dropdown.innerHTML = "<option value=''>Select a " + type.charAt(0).toUpperCase() + type.slice(1) + "</option>";

    // Fetch data from the Google Sheet
    fetchDataFromSheet(sheet, range).then(data => {
        // Populate the dropdown with options
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item[0]; // Assuming the first column contains the value
            option.text = item[0];  // Display the value in the dropdown
            dropdown.appendChild(option);
        });
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
}

// Function to fetch data from the Google Sheet
function fetchDataFromSheet(sheetName, range) {
    return new Promise((resolve, reject) => {
        const url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=${sheetName}&range=${range}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data.values); // Resolve with the sheet data
            })
            .catch(error => {
                reject(error); // Reject if there is an error
            });
    });
}

// Function to open a Google Form in a modal
function openForm(formUrl) {
    const modal = document.getElementById("form-modal");
    const iframe = document.getElementById("form-iframe");
    iframe.src = formUrl; // Set the src of the iframe to the Google Form URL
    modal.style.display = "block"; // Show the modal with the iframe
    console.log(`Opening form with URL: ${formUrl}`);
}

// Close the modal when clicking outside the form
window.onclick = function (event) {
    const modal = document.getElementById("form-modal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
        const iframe = document.getElementById("form-iframe");
        iframe.src = ""; // Reset the iframe src
        console.log("Closing form modal");
    }
};
