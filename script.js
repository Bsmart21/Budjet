document.addEventListener("DOMContentLoaded", function () {
    // Load dropdown options for both weekly and monthly budget sections
    loadDropdownOptions("weeklyDropdown", [
        "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025", "4/4/2025",
        "4/11/2025", "4/18/2025", "4/25/2025", "5/2/2025", "5/9/2025",
        "5/16/2025", "5/23/2025", "5/30/2025", "6/6/2025", "6/13/2025",
        "6/20/2025", "6/27/2025", "7/4/2025", "7/11/2025", "7/18/2025",
        "7/25/2025", "8/1/2025", "8/8/2025", "8/15/2025", "8/22/2025",
        "8/29/2025", "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025",
        "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025",
        "11/7/2025", "11/14/2025", "11/21/2025", "11/28/2025", "12/5/2025",
        "12/12/2025", "12/19/2025", "12/26/2025", "1/2/2026", "1/9/2026",
        "1/16/2026", "1/23/2026", "1/30/2026", "2/6/2026", "2/13/2026",
        "2/20/2026", "2/27/2026", "3/6/2026", "3/13/2026", "3/20/2026",
        "3/27/2026", "4/3/2026"
    ]);
   
    loadDropdownOptions("monthlyDropdown", [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]);
 
    // Add event listeners for button clicks
    document.getElementById("monthButton")?.addEventListener("click", function () {
        toggleView("monthly"); // Show the Monthly Budget section
    });
 
    document.getElementById("weekButton")?.addEventListener("click", function () {
        toggleView("weekly"); // Show the Weekly Budget section
    });
 
    document.getElementById("enterTransactionButton")?.addEventListener("click", function () {
        toggleView("transaction"); // Show Enter Transaction form
    });
 
    document.getElementById("enterBudgetButton")?.addEventListener("click", function () {
        toggleView("budgets"); // Show Enter Budgets form
    });
 
    // Initially hide all sections except the first selected one
    toggleView("weekly");
 });
 
 // Function to load dropdown options
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
    document.getElementById("weekly-budget").style.display = "none";
    document.getElementById("monthly-budget").style.display = "none";
    document.getElementById("enter-transaction").style.display = "none";
    document.getElementById("enter-budgets").style.display = "none";
 
    // Show the selected section
    if (view === "weekly") {
        document.getElementById("weekly-budget").style.display = "block";
    } else if (view === "monthly") {
        document.getElementById("monthly-budget").style.display = "block";
    } else if (view === "transaction") {
        document.getElementById("enter-transaction").style.display = "block";
    } else if (view === "budgets") {
        document.getElementById("enter-budgets").style.display = "block";
    }
 }
 