document.addEventListener("DOMContentLoaded", function () {
    const dates = [
        "2/23/2025", "3/2/2025", "3/9/2025", "3/16/2025", "3/23/2025",
        "3/30/2025", "4/6/2025", "4/13/2025", "4/20/2025", "4/27/2025",
        "5/4/2025", "5/11/2025", "5/18/2025", "5/25/2025", "6/1/2025",
        "6/8/2025", "6/15/2025", "6/22/2025", "6/29/2025", "7/6/2025",
        "7/13/2025", "7/20/2025", "7/27/2025", "8/3/2025", "8/10/2025",
        "8/17/2025", "8/24/2025", "8/31/2025", "9/7/2025", "9/14/2025",
        "9/21/2025", "9/28/2025", "10/5/2025", "10/12/2025", "10/19/2025",
        "10/26/2025", "11/2/2025", "11/9/2025", "11/16/2025", "11/23/2025",
        "11/30/2025", "12/7/2025", "12/14/2025", "12/21/2025", "12/28/2025",
        "1/4/2026", "1/11/2026", "1/18/2026", "1/25/2026", "2/1/2026",
        "2/8/2026", "2/15/2026", "2/22/2026", "3/1/2026", "3/8/2026",
        "3/15/2026", "3/22/2026", "3/29/2026"
    ];

    const dropdown = document.getElementById("dashboardDropdown");
    dropdown.innerHTML = ""; // Clear any existing options

    // Populate dropdown with dates
    dates.forEach(date => {
        let option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        dropdown.appendChild(option);
    });

    // Fetch initial data when the page loads (default to first date)
    updateSheet();
});

// Fetch data from Google Sheets when a date is selected
function updateSheet() {
    const selectedDate = document.getElementById("dashboardDropdown").value;
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?date=${encodeURIComponent(selectedDate)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("table-body");
            tableBody.innerHTML = ""; // Clear old data

            if (data.length === 0) {
                console.log("No data found for this date.");
                tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                return;
            }

            // Populate table with new data
            data.forEach(row => {
                let tr = document.createElement("tr");

                row.forEach((cell, index) => {
                    let td = document.createElement("td");

                    // Format columns B & C as currency
                    if (index === 1 || index === 2) {
                        td.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cell);
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
