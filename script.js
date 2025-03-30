function fetchSheetData() {
    const url = "https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec";
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                populateTable(data);
            } else {
                console.error("No data received from Google Sheets");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function populateTable(data) {
    const tableHeader = document.getElementById("header-row");
    const tableBody = document.getElementById("table-body");

    // Clear previous data
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    // Set table headers (First row of data)
    let headers = data[0];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // Populate table rows
    for (let i = 1; i < data.length; i++) {
        let row = document.createElement("tr");
        
        data[i].forEach((cell, index) => {
            let td = document.createElement("td");
            
            // Format columns B (index 1) and C (index 2) as currency
            if (index === 1 || index === 2) {
                td.textContent = formatCurrency(cell);
            } else {
                td.textContent = cell;
            }

            row.appendChild(td);
        });

        tableBody.appendChild(row);
    }
}

// Function to format values as currency
function formatCurrency(value) {
    let num = parseFloat(value);
    if (isNaN(num)) {
        return value; // Return original if not a valid number
    }
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Call function to fetch data
fetchSheetData();
