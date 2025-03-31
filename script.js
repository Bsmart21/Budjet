document.addEventListener("DOMContentLoaded", function () {
    // Get today's date for default selection
    const today = new Date();
    
    // Format today’s date to match dropdown values (MM/DD/YYYY)
    function getFormattedDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    // Load dropdown options for weekly and monthly budget sections
    const weeklyDates = [
        "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025", "4/4/2025",
        "4/11/2025", "4/18/2025", "4/25/2025", "5/2/2025", "5/9/2025",
        "5/16/2025", "5/23/2025", "5/30/2025", "6/6/2025", "6/13/2025",
        "6/20/2025", "6/27/2025", "7/4/2025", "7/11/2025", "7/18/2025",
        "7/25/2025", "8/1/2025", "8/8/2025", "8/15/2025", "8/22/2025",
        "8/29/2025", "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025",
        "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025",
        "11/7/2025", "11/14/2025", "11/21/2025", "11/28/2025", "12/5/2025",
        "12/12/2025", "12/19/2025", "12/26/2025", "1/2/2026", "1/9/2026",
        "1/16/2026", "1/23/2026", "1/30/2026", "2/6/2026", "2/13/2026",
        "2/20/2026", "2/27/2026", "3/6/2026", "3/13/2026", "3/20/2026",
        "3/27/2026", "4/3/2026"
    ];

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    loadDropdownOptions("weeklyDropdown", weeklyDates, getFormattedDate(today));
    loadDropdownOptions("monthlyDropdown", months, months[today.getMonth()]);

    // Add event listeners for dropdown changes
    document.getElementById("weeklyDropdown").addEventListener("change", function () {
        updateSheet("Entry");
    });

    document.getElementById("monthlyDropdown").addEventListener("change", function () {
        updateSheet("month");
    });

    // Add event listener for menu selection
    document.getElementById("viewSelector").addEventListener("change", function () {
        toggleView(this.value);
    });

    // Initially hide all sections except the first selected one
    toggleView(document.getElementById("viewSelector").value);
});

// Function to load dropdown options with a default selection
function loadDropdownOptions(dropdownId, options, defaultValue) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "";

    options.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (option === defaultValue) {
            opt.selected = true;
        }
        dropdown.appendChild(opt);
    });

    // Trigger updateSheet on load for default selection
    updateSheet(dropdownId === "weeklyDropdown" ? "Entry" : "month");
}

// Function to update the sheet data
function updateSheet(sheetName) {
    const dropdownId = sheetName === "Entry" ? "weeklyDropdown" : "monthlyDropdown";
    const selectedOption = document.getElementById(dropdownId).value;

    if (!selectedOption) {
        console.error("No option selected in the dropdown.");
        return;
    }

    const url = `https://script.google.com/macros/s/AKfycbxC3iF_4b9Why3JwluP-ZecVXGV7pzkHs8GGMiiOyggemagurcGtYHqqHEFIRgKViOE/exec?sheet=${sheetName}&value=${encodeURIComponent(selectedOption)}`;

    const tableBodyId = sheetName === "Entry" ? "weekly-table-body" : "monthly-table-body";
    const tableBody = document.getElementById(tableBodyId);

    // Show loading indicator
    tableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            tableBody.innerHTML = "";

            if (!data || data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                return;
            }

            data.forEach(row => {
                let tr = document.createElement("tr");
                row.forEach((cell, index) => {
                    let td = document.createElement("td");

                    if (index === 1 || index === 2) {
                        td.textContent = formatCurrency(cell);
                    } else {
                        td.textContent = cell;
                    }

                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Error updating sheet:", error);
            tableBody.innerHTML = `<tr><td colspan='3' style="color:red;">Error loading data. Please try again.</td></tr>`;
        });
}

// Function to toggle between Weekly Budget, Monthly Budget, and Forms
function toggleView(view) {
    document.getElementById("weekly-budget").style.display = view === "weekly" ? "block" : "none";
    document.getElementById("monthly-budget").style.display = view === "monthly" ? "block" : "none";
    document.getElementById("enter-transaction").style.display = view === "transaction" ? "block" : "none";
    document.getElementById("enter-budgets").style.display = view === "budgets" ? "block" : "none";
}

// Function to format currency values
function formatCurrency(value) {
    let num = parseFloat(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
}
