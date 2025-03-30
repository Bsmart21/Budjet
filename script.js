document.addEventListener("DOMContentLoaded", function () {
    // Load dropdown options for both weekly and monthly budget sections
    fetchDropdownOptions("DropdownOptions", "B2:B59", "weeklyDropdown");
    fetchDropdownOptions("DropdownOptions", "C1:C12", "monthlyDropdown");

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

// Function to fetch dropdown options
function fetchDropdownOptions(sheetName, range, dropdownId) {
    const url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=${sheetName}&range=${encodeURIComponent(range)}`;

    fetch(url)
        .then(response => response.json())
        .then(options => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = "";

            if (options.length === 0) {
                let opt = document.createElement("option");
                opt.textContent = "No options available";
                dropdown.appendChild(opt);
                return;
            }

            options.forEach(option => {
                let opt = document.createElement("option");
                opt.value = option;
                opt.textContent = option;
                dropdown.appendChild(opt);
            });
        })
        .catch(error => console.error("Error fetching dropdown options:", error));
}

// Function to update the sheet data
function updateSheet(sheetName, selectedValue) {
    const url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=${sheetName}&value=${encodeURIComponent(selectedValue)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Successfully updated sheet with selected value:", data);
        })
        .catch(error => console.error("Error updating sheet:", error));
}

// Function to toggle between Weekly Budget, Monthly Budget, and Forms
function toggleView(view) {
    document.getElementById("weekly-budget").style.display = view === "weekly" ? "block" : "none";
    document.getElementById("monthly-budget").style.display = view === "monthly" ? "block" : "none";
    document.getElementById("enter-transaction").style.display = view === "transaction" ? "block" : "none";
    document.getElementById("enter-budgets").style.display = view === "budgets" ? "block" : "none";
}
