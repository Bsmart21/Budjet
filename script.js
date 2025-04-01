document.addEventListener("DOMContentLoaded", function () {
    const monthBtn = document.getElementById("monthBtn");
    const weekBtn = document.getElementById("weekBtn");
    const budgetBtn = document.getElementById("budgetBtn");
    const transactionBtn = document.getElementById("transactionBtn");
  
    const dropdownContainer = document.getElementById("dropdownContainer");
    const dropdown = document.getElementById("dropdown");
    const dataContainer = document.getElementById("dataContainer");
  
    // Predefined dropdown options
    const monthOptions = [
      "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December", "January", "February"
    ];
    
    const weekOptions = [
      "3/7/2025", "3/14/2025", "3/21/2025", "3/28/2025", "4/4/2025", "4/11/2025",
      "4/18/2025", "4/25/2025", "5/2/2025", "5/9/2025", "5/16/2025", "5/23/2025",
      "5/30/2025", "6/6/2025", "6/13/2025", "6/20/2025", "6/27/2025", "7/4/2025",
      "7/11/2025", "7/18/2025", "7/25/2025", "8/1/2025", "8/8/2025", "8/15/2025",
      "8/22/2025", "8/29/2025", "9/5/2025", "9/12/2025", "9/19/2025", "9/26/2025",
      "10/3/2025", "10/10/2025", "10/17/2025", "10/24/2025", "10/31/2025",
      "11/7/2025", "11/14/2025", "11/21/2025", "11/28/2025", "12/5/2025",
      "12/12/2025", "12/19/2025", "12/26/2025", "1/2/2026", "1/9/2026",
      "1/16/2026", "1/23/2026", "1/30/2026", "2/6/2026", "2/13/2026",
      "2/20/2026", "2/27/2026", "3/6/2026", "3/13/2026", "3/20/2026", "3/27/2026"
    ];
  
    function updateDropdown(options) {
      dropdown.innerHTML = "";
      options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
      });
      dropdownContainer.style.display = "block";
    }
  
    monthBtn.addEventListener("click", function () {
      updateDropdown(monthOptions);
      dropdown.dataset.sheet = "Month";
    });
  
    weekBtn.addEventListener("click", function () {
      updateDropdown(weekOptions);
      dropdown.dataset.sheet = "Entry";
    });
  
    budgetBtn.addEventListener("click", function () {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform", "_blank");
    });
  
    transactionBtn.addEventListener("click", function () {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform", "_blank");
    });
  
    dropdown.addEventListener("change", function () {
      const selectedValue = dropdown.value;
      const sheetName = dropdown.dataset.sheet;
      if (!selectedValue || !sheetName) return;
  
      fetch(`https://script.google.com/macros/s/AKfycbz6IL4D6Ygo71QrnfiG3E3sJtgajs-NqmI8byaKaElKyq1r3toxVdSpKsUBfKAH4_k/exec?sheet=${sheetName}&value=${selectedValue}`)
        .then(response => response.json())
        .then(data => {
          dataContainer.innerHTML = "<h3>Data from Google Sheet:</h3>";
          data.forEach(row => {
            dataContainer.innerHTML += `<p>${row.join(" | ")}</p>`;
          });
        })
        .catch(error => console.error("Error fetching data:", error));
    });
  });
  