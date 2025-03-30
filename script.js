document.addEventListener("DOMContentLoaded", function () {
    // Define hardcoded options for Weekly and Monthly dropdowns
    const weeklyOptions = [
        "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025",
        "4/4/2025", "4/11/2025", "4/18/2025", "4/25/2025",
        "5/2/2025", "5/9/2025", "5/16/2025", "5/23/2025", "5/30/2025",
        "6/6/2025", "6/13/2025", "6/20/2025", "6/27/2025",
        "7/4/2025", "7/11/2025", "7/18/2025", "7/25/2025",
        "8/1/2025", "8/8/2025", "8/15/2025", "8/22/2025", "8/29/2025",
        "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025",
        "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025",
        "11/7/2025", "11/14/2025", "11/21/2025", "11/28/2025",
        "12/5/2025", "12/12/2025", "12/19/2025", "12/26/2025"
    ];

    const monthlyOptions = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Load dropdown options for weekly and monthly budget sections
    loadDropdownOptions(weeklyOptions, "weeklyDropdown");
    loadDropdownOptions(monthlyOptions, "monthlyDropdown");

    // Add event listeners for dropdown changes
    document.getElementById("weeklyDropdown").addEventListener("change", function () {
        updateSheet("Entry", this.value);  // Send the selected value to the "Entry" sheet
    });

    document.getElementById("monthlyDropdown").addEventListener("change", function () {
        updateSheet("month", this.value);  // Send the selected value to the "month" sheet
    });

    // Add event listener for menu selection
    document.getElementById("viewSelector").addEventListener("change", function () {
        toggleView(this.value);
    });

    // Initially hide all sections except the first selected one
    toggleView(document.getElementById("viewSelector").value);
});

// Function to load options into the dropdown
function loadDropdownOptions(options, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ""; // Clear existing options

    options.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

// Function to send the selected option to the Apps Script
function updateSheet(sheetName, selectedValue) {
    const url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=${sheetName}&value=${encodeURIComponent(selectedValue)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Successfully updated sheet with selected value:", data);
        })
        .catch(error => {
            console.error("Error updating sheet:", error);
            alert("There was an error updating the sheet. Please check the console for details.");
        });
}

// Function to toggle between Weekly Budget, Monthly Budget, and Forms
function toggleView(view) {
    document.getElementById("weekly-budget").style.display = view === "weekly" ? "block" : "none";
    document.getElementById("monthly-budget").style.display = view === "monthly" ? "block" : "none";
    document.getElementById("enter-transaction").style.display = view === "transaction" ? "block" : "none";
    document.getElementById("enter-budgets").style.display = view === "budgets" ? "block" : "none";
}
