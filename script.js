document.addEventListener("DOMContentLoaded", function () {
    const monthBtn = document.getElementById("monthBtn");
    const weekBtn = document.getElementById("weekBtn");
    const budgetBtn = document.getElementById("budgetBtn");
    const transactionBtn = document.getElementById("transactionBtn");
  
    const dropdownContainer = document.getElementById("dropdownContainer");
    const dropdown = document.getElementById("dropdown");
    const dataContainer = document.getElementById("dataContainer");
    const formContainer = document.getElementById("formContainer");
  
    let currentTitle = ""; // Stores the title (Monthly or Weekly Budget)
  
    // Web App URL (replace with your deployed URL)
    const webAppUrl = "https://script.google.com/macros/s/AKfycbz6IL4D6Ygo71QrnfiG3E3sJtgajs-NqmI8byaKaElKyq1r3toxVdSpKsUBfKAH4_k/exec?url=";
  
    // Google Forms URLs
    const budgetFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfA3abugtBWzuurMlBeMjVjjVDld645j_MGsS08xOORC041hw/viewform";
    const transactionFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd7E722SXLcVjUcSzASMeYfW1ZjRC-HVBp8EpSctxMrqJPAUw/viewform";
  
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
  
    function updateDropdown(options, title) {
      dropdown.innerHTML = "";
      options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
      });
      dropdownContainer.style.display = "block";
      currentTitle = title;
    }
  
    monthBtn.addEventListener("click", function () {
      updateDropdown(monthOptions, "Monthly Budget");
      dropdown.dataset.sheet = "Month";
      formContainer.style.display = "none";
    });
  
    weekBtn.addEventListener("click", function () {
      updateDropdown(weekOptions, "Weekly Budget");
      dropdown.dataset.sheet = "Entry";
      formContainer.style.display = "none";
    });
  
    budgetBtn.addEventListener("click", function () {
      formContainer.style.display = "block";
      formContainer.innerHTML = `<iframe src="${webAppUrl + encodeURIComponent(budgetFormUrl)}" width="100%" height="800px" frameborder="0"></iframe>`;
      dropdownContainer.style.display = "none";
      dataContainer.innerHTML = "";
    });
  
    transactionBtn.addEventListener("click", function () {
      formContainer.style.display = "block";
      formContainer.innerHTML = `<iframe src="${webAppUrl + encodeURIComponent(transactionFormUrl)}" width="100%" height="800px" frameborder="0"></iframe>`;
      dropdownContainer.style.display = "none";
      dataContainer.innerHTML = "";
    });
  
    dropdown.addEventListener("change", function () {
      const selectedValue = dropdown.value;
      const sheetName = dropdown.dataset.sheet;
      if (!selectedValue || !sheetName) return;
  
      fetch(`https://script.google.com/macros/s/AKfycbz6IL4D6Ygo71QrnfiG3E3sJtgajs-NqmI8byaKaElKyq1r3toxVdSpKsUBfKAH4_k/exec?sheet=${sheetName}&value=${selectedValue}`)
        .then(response => response.json())
        .then(data => {
          dataContainer.innerHTML = `<h2>${currentTitle}</h2>`;
  
          let table = `<table border="1" cellpadding="5" cellspacing="0">
                        <thead>
                          <tr>
                            <th>Budget Item</th>
                            <th>Cost</th>
                            <th>Budget</th>
                          </tr>
                        </thead>
                        <tbody>`;
  
          data.forEach(row => {
            let cost = parseFloat(row[1]) || 0;
            let budget = parseFloat(row[2]) || 0;
  
            cost = cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            budget = budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
            table += `<tr>
                        <td>${row[0]}</td>
                        <td>${cost}</td>
                        <td>${budget}</td>
                      </tr>`;
          });
  
          table += `</tbody></table>`;
          dataContainer.innerHTML += table;
        })
        .catch(error => console.error("Error fetching data:", error));
    });
  });
  