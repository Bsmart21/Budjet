document.addEventListener("DOMContentLoaded", function () {
    // Buttons
    const monthButton = document.getElementById("monthButton");
    const weekButton = document.getElementById("weekButton");
    const enterBudgetButton = document.getElementById("enterBudgetButton");
    const enterTransactionButton = document.getElementById("enterTransactionButton");

    // Dropdowns
    const monthDropdown = document.getElementById("monthDropdown");
    const weekDropdown = document.getElementById("weekDropdown");

    // Table display
    const dataTable = document.getElementById("dataTable");

    // Define month and week options
    const months = [
        "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December",
        "January", "February"
    ];

    const weeks = [
        "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025",
        "4/4/2025", "4/11/2025", "4/18/2025", "4/25/2025",
        "5/2/2025", "5/9/2025", "5/16/2025", "5/23/2025",
        "5/30/2025", "6/6/2025", "6/13/2025", "6/20/2025",
        "6/27/2025", "7/4/2025", "7/11/2025", "7/18/2025",
        "7/25/2025", "8/1/2025", "8/8/2025", "8/15/2025",
        "8/22/2025", "8/29/2025", "9/5/2025", "9/12/2025",
        "9/19/2025", "9/26/2025", "10/3/2025", "10/10/2025",
        "10/17/2025", "10/24/2025", "10/31/2025", "11/7/2025",
        "11/14/2025", "11/21/2025", "11/28/2025", "12/5/2025",
        "12/12/2025", "12/19/2025", "12/26/2025", "1/2/2026",
        "1/9/2026", "1/16/2026", "1/23/2026", "1/30/2026",
        "2/6/2026", "2/13/2026", "2/20/2026", "2/27/2026",
        "3/6/2026", "3/13/2026", "3/20/2026", "3/27/2026"
    ];

    // Populate dropdowns
    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = ""; // Clear existing options
        options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });
    }

    // Show Month dropdown and populate options
    monthButton.addEventListener("click", function () {
        monthDropdown.style.display = "block";
        weekDropdown.style.display = "none";
        populateDropdown(monthDropdown, months);
    });

    // Show Week dropdown and populate options
    weekButton.addEventListener("click", function () {
        weekDropdown.style.display = "block";
        monthDropdown.style.display = "none";
        populateDropdown(weekDropdown, weeks);
    });

    // Handle Month selection
    monthDropdown.addEventListener("change", function () {
        let selectedMonth = monthDropdown.value;
        updateSheet("Month", selectedMonth);
    });

    // Handle Week selection
    weekDropdown.addEventListener("change", function () {
        let selectedWeek = weekDropdown.value;
        updateSheet("Entry", selectedWeek);
    });

    // Open Budget Form
    enterBudgetButton.addEventListener("click", function () {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform", "_blank");
    });

    // Open Transaction Form
    enterTransactionButton.addEventListener("click", function () {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform", "_blank");
    });

    // Function to update Google Sheet and fetch new data
    function updateSheet(sheetName, value) {
        let url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=${sheetName}&value=${encodeURIComponent(value)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Data received:", data);
                displayData(data);
            })
            .catch(error => console.error("Error updating sheet:", error));
    }

    // Function to display data in table
    function displayData(data) {
        dataTable.innerHTML = ""; // Clear existing table content

        if (!data || data.length === 0) {
            dataTable.innerHTML = "<p>No data available.</p>";
            return;
        }

        let table = document.createElement("table");
        table.border = "1";

        // Loop through data and create table rows
        data.forEach(row => {
            let tr = document.createElement("tr");
            row.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        dataTable.appendChild(table);
    }
});
