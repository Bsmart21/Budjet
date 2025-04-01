window.addEventListener('DOMContentLoaded', (event) => {
    // Add event listeners for buttons
    document.getElementById("monthButton").addEventListener("click", function () {
        console.log("Month button clicked");
        toggleView("monthly"); // Show the Monthly Budget section
    });

    document.getElementById("weekButton").addEventListener("click", function () {
        console.log("Week button clicked");
        toggleView("weekly"); // Show the Weekly Budget section
    });

    // Event listener for Enter Transaction button
    document.getElementById("enterTransactionButton").addEventListener("click", function () {
        console.log("Enter Transaction button clicked");
        openForm("https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform");
    });

    // Event listener for Enter Budget button
    document.getElementById("enterBudgetButton").addEventListener("click", function () {
        console.log("Enter Budget button clicked");
        openForm("https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform");
    });

    // Initially hide all sections except the first selected one
    toggleView("monthly");
});

// Function to toggle between sections based on button click
function toggleView(view) {
    console.log(`Toggling view to: ${view}`);
    // Hide all sections
    document.getElementById("monthly-budget").style.display = "none";
    document.getElementById("weekly-budget").style.display = "none";
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

// Function to open a Google Form in a modal
function openForm(formUrl) {
    const modal = document.getElementById("form-modal");
    const iframe = document.getElementById("form-iframe");
    iframe.src = formUrl; // Set the src of the iframe to the Google Form URL
    modal.style.display = "block"; // Show the modal with the iframe
    console.log(`Opening form with URL: ${formUrl}`);
}

// Close the modal when clicking outside the form
window.onclick = function (event) {
    const modal = document.getElementById("form-modal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
        const iframe = document.getElementById("form-iframe");
        iframe.src = ""; // Reset the iframe src
        console.log("Closing form modal");
    }
};
