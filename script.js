// Buttons handling
document.getElementById('monthBtn').addEventListener('click', () => {
    document.getElementById('monthDropdownContainer').style.display = 'block';
    document.getElementById('weekDropdownContainer').style.display = 'none';
  });
  
  document.getElementById('weekBtn').addEventListener('click', () => {
    document.getElementById('weekDropdownContainer').style.display = 'block';
    document.getElementById('monthDropdownContainer').style.display = 'none';
  });
  
  // Button handlers for forms (just opening Google Forms in a new tab)
  document.getElementById('enterBudgetBtn').addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform', '_blank');
  });
  
  document.getElementById('enterTransactionBtn').addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform', '_blank');
  });
  
  // Display data based on the dropdown selection (Month or Week)
  document.getElementById('monthDropdown').addEventListener('change', function() {
    const selectedMonth = this.value;
    updateCellAndDisplayData('Month', selectedMonth);
  });
  
  document.getElementById('weekDropdown').addEventListener('change', function() {
    const selectedWeek = this.value;
    updateCellAndDisplayData('Entry', selectedWeek);
  });
  
  // Function to update the sheet and display the data in the table
  function updateCellAndDisplayData(sheetName, selectedValue) {
    const scriptURL = `https://script.google.com/macros/s/AKfycbyoPNEUXpwSRUPSKyOifRsQyf7UGLLJdH6TT68HKWFKu-aUYIethEqjinzoUHrTa2ov/exec?sheet=${sheetName}&value=${selectedValue}`;
  
    fetch(scriptURL)
      .then(response => response.json())  // Parse the JSON response
      .then(data => {
        // Clear existing data
        const table = (sheetName === "Month") ? document.getElementById("monthlyTable") : document.getElementById("weeklyTable");
        table.innerHTML = ""; // Clear previous data
  
        // Populate the table with new data
        data.forEach(row => {
          const tr = document.createElement("tr");
          row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  