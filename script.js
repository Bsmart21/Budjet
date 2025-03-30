// Function to update the sheet data
function updateSheet(sheetName) {
    // Ensure the selectedOption is correctly retrieved from the dropdown
    const dropdownId = sheetName === "Entry" ? "weeklyDropdown" : "monthlyDropdown";
    const selectedOption = document.getElementById(dropdownId).value;
 
    // Ensure that selectedOption is valid
    if (!selectedOption) {
        console.error("No option selected in the dropdown.");
        return;
    }
 
    // Build the URL with the sheet and value parameters
    const url = `https://script.google.com/macros/s/AKfycbzZyNoPwtpsySGTdmW4l9ZgclcVBH33zzms4X5LOUzhRMRyr5_W_tPKnNPZXj2I3sn0/exec?sheet=${sheetName}&value=${encodeURIComponent(selectedOption)}`;
 
    // Fetch the data from the Google Apps Script
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let tableBodyId = sheetName === "Entry" ? "weekly-table-body" : "monthly-table-body";
            let tableBody = document.getElementById(tableBodyId);
            tableBody.innerHTML = "";
 
            // Handle case where no data is returned
            if (!data || data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                return;
            }
 
            // Populate the table with the updated data
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
        .catch(error => console.error("Error updating sheet:", error));
 }
 