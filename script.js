document.addEventListener("DOMContentLoaded", function () {
    // Load dropdown options
    fetchDropdownOptions("DropdownOptions", "B2:B59", "weeklyDropdown");
    fetchDropdownOptions("DropdownOptions", "C1:C12", "monthlyDropdown");

    // Add event listeners for dropdown changes
    document.getElementById("weeklyDropdown").addEventListener("change", function () {
        updateSheet("Entry");
    });

    document.getElementById("monthlyDropdown").addEventListener("change", function () {
        updateSheet("month");
    });

    // Load initial data
    updateSheet("Entry");
    updateSheet("month");
});

// Function to fetch dropdown options
function fetchDropdownOptions(sheetName, range, dropdownId) {
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?sheet=${sheetName}&range=${encodeURIComponent(range)}`;

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

            updateSheet(dropdownId === "weeklyDropdown" ? "Entry" : "month");
        })
        .catch(error => console.error("Error fetching dropdown options:", error));
}

// Function to update the sheet data
function updateSheet(sheetName) {
    const dropdownId = sheetName === "Entry" ? "weeklyDropdown" : "monthlyDropdown";
    const selectedOption = document.getElementById(dropdownId).value;
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?sheet=${sheetName}&option=${encodeURIComponent(selectedOption)}`;

    fetch(url)
