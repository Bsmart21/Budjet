document.addEventListener("DOMContentLoaded", function () {
    fetchDropdownOptions("Entry", "weeklyDropdown");
    fetchDropdownOptions("month", "monthlyDropdown");
});

function fetchDropdownOptions(sheetName, dropdownId) {
    const url = `https://script.google.com/macros/s/AKfycbwgNZ3IE4VmPfab1nUZr1X23nnAuBKntaJ-bi0Lxu_nPlamV_24gq2N8Qu5NpwGM4rZ/exec?sheet=${sheetName}&dropdown=true`;

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

            updateSheet(sheetName);
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

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
                return;
            }

            data.forEach(row => {
                let tr = document.createElement("tr");
                row.forEach(cell => {
                    let td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function switchView() {
    const selectedView = document.getElementById("viewSelector").value;

    document.getElementById("weeklyView").style.display = selectedView === "weekly" ? "block" : "none";
    document.getElementById("monthlyView").style.display = selectedView === "monthly" ? "block" : "none";
    document.getElementById("form1View").style.display = selectedView === "form1" ? "block" : "none";
    document.getElementById("form2View").style.display = selectedView === "form2" ? "block" : "none";
}
