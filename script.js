document.addEventListener("DOMContentLoaded", function () {
    // Static options for months and entry dates
    const monthOptions = [
        "January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const entryOptions = [
        "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025", "4/4/2025", "4/11/2025", 
        "4/18/2025", "4/25/2025", "5/2/2025", "5/9/2025", "5/16/2025", "5/23/2025", 
        "5/30/2025", "6/6/2025", "6/13/2025", "6/20/2025", "6/27/2025", "7/4/2025", 
        "7/11/2025", "7/18/2025", "7/25/2025", "8/1/2025", "8/8/2025", "8/15/2025", 
        "8/22/2025", "8/29/2025", "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025", 
        "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025", "11/7/2025", 
        "11/14/2025", "11/21/2025", "11/28/2025", "12/5/2025", "12/12/2025", "12/19/2025", 
        "12/26/2025", "1/2/2026", "1/9/2026", "1/16/2026", "1/23/2026", "1/30/2026", 
        "2/6/2026", "2/13/2026", "2/20/2026", "2/27/2026", "3/6/2026", "3/13/2026", 
        "3/20/2026", "3/27/2026", "4/3/2026"
    ];

    // Debug log: Checking if the page loaded correctly
    console.log("Page loaded. Populating dropdowns...");

    // Populate dropdown options for both weekly and monthly budget sections
    populateDropdownOptions("monthlyDropdown", monthOptions);
    populateDropdownOptions("weeklyDropdown", entryOptions);

    // Add event listeners for dropdown changes
    document.getElementById("weeklyDropdown").addEventListener("change", function () {
        console.log("Weekly dropdown changed to:", this.value);
        updateSheet("Entry");
    });

    document.getElementById("monthlyDropdown").addEventListener("change", function () {
        console.log("Monthly dropdown changed to:", this.value);
        updateSheet("month");
    });

    // Add event listener for menu selection
    document.getElementById("viewSelector").addEventListener("change", function () {
        toggleView(this.value);
    });

    // Initially hide all sections except the first selected one
    toggleView(document.getElementById("viewSelector").value);
});

// Function to populate dropdown options
function populateDropdownOptions(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);

    // Debug log: Check if dropdown is found
    if (!dropdown) {
        console.error(`Dropdown with ID "${dropdownId}" not found!`);
        return;
    }

    console.log(`Populating dropdown with ID "${dropdownId}"`);

    dropdown.innerHTML = "";  // Clear any existing options

    if (options.length === 0) {
        let opt = document.createElement("option");
        opt.textContent = "No options available";
        dropdown.appendChild(opt);
        return;
    }

    // Create and append options to the dropdown
    options.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

// Function to update the sheet data
function updateSheet(sheetName) {
    const dropdownId = sheetName === "Entry" ? "weeklyDropdown" : "monthlyDropdown";
    const selectedOption = document.getElementById(dropdownId).value;
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?sheet=${sheetName}&option=${encodeURIComponent(selectedOption)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let tableBodyId = sheetName === "Entry" ? "weekly-table-body" : "monthly-table-body";
            let tableBody = document.getElementById(tableBodyId);
            tableBody.innerHTML = "";

            if (!data || data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                return;
            }

            data.forEach(row => {
                let tr = document.createElement("tr");
                row.forEach((cell, index) => {
                    let td = document.createElement("td");

                    // Ensure column B (index 1) and column C (index 2) are formatted as currency
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
        .catch(error => console.error("Error fetching data:", error));
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
    if (isNaN(num)) return value; // Return original if not a number
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
}
