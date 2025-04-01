document.addEventListener("DOMContentLoaded", function () {
    // Buttons
    document.getElementById("monthBtn").addEventListener("click", function () {
        showDropdown("monthDropdown");
    });

    document.getElementById("weekBtn").addEventListener("click", function () {
        showDropdown("weekDropdown");
    });

    document.getElementById("enterBudgetBtn").addEventListener("click", function () {
        showForm("https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform");
    });

    document.getElementById("enterTransactionBtn").addEventListener("click", function () {
        showForm("https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform");
    });

    function showDropdown(dropdownId) {
        document.getElementById("monthDropdown").style.display = "none";
        document.getElementById("weekDropdown").style.display = "none";
        document.getElementById(dropdownId).style.display = "block";
    }

    function showForm(url) {
        let formContainer = document.getElementById("formContainer");
        if (!formContainer) {
            console.error("Form container not found!");
            return;
        }
        formContainer.innerHTML = `<iframe src="${url}" style="width: 100%; height: 600px; border: none;"></iframe>`;
        formContainer.style.display = "block";
    }

    document.getElementById("monthDropdown").addEventListener("change", function () {
        let selectedMonth = this.value;
        updateCellAndDisplayData("Month", selectedMonth);
    });

    document.getElementById("weekDropdown").addEventListener("change", function () {
        let selectedWeek = this.value;
        updateCellAndDisplayData("Entry", selectedWeek);
    });

    function updateCellAndDisplayData(sheet, value) {
        fetch(`https://script.google.com/macros/s/AKfycbz6IL4D6Ygo71QrnfiG3E3sJtgajs-NqmI8byaKaElKyq1r3toxVdSpKsUBfKAH4_k/exec?sheet=${sheet}&value=${value}`)
            .then(response => response.json())
            .then(data => displayData(data, sheet))
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data, sheet) {
        let tableContainer = document.getElementById("tableContainer");
        let title = sheet === "Month" ? "Monthly Budget" : "Weekly Budget";
        let tableHTML = `<h2>${title}</h2><table border="1"><tr><th>Budget Item</th><th>Cost</th><th>Budget</th></tr>`;

        data.forEach(row => {
            let item = row[0] || ""; 
            let cost = row[1] !== "" ? formatCurrency(row[1]) : "$0.00";
            let budget = row[2] !== "" ? formatCurrency(row[2]) : "$0.00";
            tableHTML += `<tr><td>${item}</td><td>${cost}</td><td>${budget}</td></tr>`;
        });

        tableHTML += "</table>";
        tableContainer.innerHTML = tableHTML;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    }
});
