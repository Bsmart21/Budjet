document.addEventListener("DOMContentLoaded", function () {
    fetchDropdownOptions("DropdownOptions", "B2:B59", "weeklyDropdown");
    fetchDropdownOptions("DropdownOptions", "C1:C12", "monthlyDropdown");
});

function fetchDropdownOptions(sheetName, range, dropdownId) {
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?sheet=${sheetName}&range=${encodeURIComponent(range)}`;

    fetch(url)
        .then(response => response.json())
        .then(options => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = "";

            options.forEach(option => {
                let opt = document.createElement("option");
                opt.value = option;
                opt.textContent = option;
                dropdown.appendChild(opt);
            });

            // Load data once dropdown options are fetched
            updateSheet(dropdownId === "weeklyDropdown" ? "Entry" : "month");
        })
        .catch(error => console.error("Error fetching dropdown options:", error));
}

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

// Function to format currency values
function formatCurrency(value) {
    let num = parseFloat(value);
    if (isNaN(num)) return value; // Return original if not a number
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
}
