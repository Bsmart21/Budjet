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
    let options;

    // Select the dropdown element based on type
    if (type === "month") {
        dropdown = document.getElementById("monthlyDropdown");
        options = [
            "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025",
            "4/4/2025", "4/11/2025", "4/18/2025", "4/25/2025",
            "5/2/2025", "5/9/2025", "5/16/2025", "5/23/2025", "5/30/2025",
            "6/6/2025", "6/13/2025", "6/20/2025", "6/27/2025",
            "7/4/2025", "7/11/2025", "7/18/2025", "7/25/2025",
            "8/1/2025", "8/8/2025", "8/15/2025", "8/22/2025", "8/29/2025",
            "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025",
            "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025",
            "11/7/2025", "11/14/2025", "11/21/2025", "11/28/2025",
            "12/5/2025", "12/12/2025", "12/19/2025", "12/26/2025",
            "1/2/2026", "1/9/2026", "1/16/2026", "1/23/2026", "1/30/2026",
            "2/6/2026", "2/13/2026", "2/20/2026", "2/27/2026",
            "3/6/2026", "3/13/2026", "3/20/2026", "3/27/2026"
        ];
    } else if (type === "week") {
        dropdown = document.getElementById("weeklyDropdown");
        options = [
            "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December",
            "January", "February"
        ];
    }

    // Clear existing options
    dropdown.innerHTML = "<option value=''>Select a " + type.charAt(0).toUpperCase() + type.slice(1) + "</option>";

    // Populate the dropdown with options
    options.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = optionValue; // Set the value of the option
        option.text = optionValue;  // Set the displayed text of the option
        dropdown.appendChild(option);
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
