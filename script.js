window.onload = function () {
    // Load dropdown options for months
    loadDropdownOptions("monthlyDropdown", [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]);

    // Load dropdown options for weeks
    loadDropdownOptions("weeklyDropdown", [
        "Week 1", "Week 2", "Week 3", "Week 4"
    ]);

    // Add event listeners for button clicks
    document.getElementById("monthButton").addEventListener("click", function () {
        toggleView("monthly"); // Show the Monthly Budget section
    });

    document.getElementById("weekButton").addEventListener("click", function () {
        toggleView("weekly"); // Show the Weekly Budget section
    });

    // Add event listeners for dropdown changes (when a month is selected)
    document.getElementById("monthlyDropdown").addEventListener("change", function () {
        const selectedMonth = this.value;
        if (selectedMonth) {
            fetchMonthData(selectedMonth); // Fetch data for the selected month
        }
    });

    // Add event listeners for dropdown changes (when a week is selected)
    document.getElementById("weeklyDropdown").addEventListener("change", function () {
        const selectedWeek = this.value;
        if (selectedWeek) {
            fetchWeekData(selectedWeek); // Fetch data for the selected week
        }
    });

    // Initially hide all sections except the first selected one
    toggleView("monthly");
};

// Function to load dropdown options (for months or weeks)
function loadDropdownOptions(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ""; // Clear existing options

    options.forEach(option => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

// Function to toggle between sections based on button click
function toggleView(view) {
    // Hide all sections
    document.getElementById("monthly-budget").style.display = "none";
    document.getElementById("weekly-budget").style.display = "none";
    document.getElementById("enter-transaction").style.display = "none";
    document.getElementById("enter-budgets").style.display = "none";
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

// Fetch data from Google Sheets for the selected month
function fetchMonthData(month) {
    // Call the Google Apps Script to fetch data for the selected month
    const url = `https://script.google.com/macros/s/AKfycby2UEVzu_w3Ee0eVv2ITcB2a4NHS0HL2tb9PAiJboqTvLpGevt4jgmry5TK2I8FviNt/exec?sheet=Month&month=${month}`;
    
    // Fetch data from the Google Apps Script
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the table with the returned data
            displayMonthData(data);
        })
        .catch(error => {
            console.error("Error fetching month data:", error);
        });
}

// Fetch data from Google Sheets for the selected week
function fetchWeekData(week) {
    // Call the Google Apps Script to fetch data for the selected week
    const url = `https://script.google.com/macros/s/AKfycbzZyNoPwtpsySGTdmW4l9ZgclcVBH33zzms4X5LOUzhRMRyr5_W_tPKnNPZXj2I3sn0/exec?sheet=Entry&week=${week}`;
    
    // Fetch data from the Google Apps Script
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the table with the returned data
            displayWeekData(data);
        })
        .catch(error => {
            console.error("Error fetching week data:", error);
        });
}

// Function to display the fetched month data in the table
function displayMonthData(data) {
    const tableBody = document.getElementById("monthly-table-body");
    tableBody.innerHTML = ""; // Clear previous data

    if (data && data.length > 0) {
        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.date}</td><td>${row.amount}</td><td>${row.category}</td>`;
            tableBody.appendChild(tr);
        });
    } else {
        tableBody.innerHTML = "<tr><td colspan='3'>No data available for this month.</td></tr>";
    }
}

// Function to display the fetched week data in the table
function displayWeekData(data) {
    const tableBody = document.getElementById("weekly-table-body");
    tableBody.innerHTML = ""; // Clear previous data

    if (data && data.length > 0) {
        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.date}</td><td>${row.amount}</td><td>${row.category}</td>`;
            tableBody.appendChild(tr);
        });
    } else {
        tableBody.innerHTML = "<tr><td colspan='3'>No data available for this week.</td></tr>";
    }
}
