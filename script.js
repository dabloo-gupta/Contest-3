// Fetch data using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => renderTable(data))
      .catch(error => console.log(error));
  }
  
  // Fetch data using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Render the table with data
  function renderTable(data) {
    const table = document.getElementById('coinTable');
  
    // Clear existing table rows
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  
    // Iterate over the data and create rows
    data.forEach(coin => {
      const row = table.insertRow();
      const { name, id, image, symbol, current_price, total_volume } = coin;
  
      // Add data to the row
      row.insertCell().textContent = name;
      row.insertCell().textContent = id;
      row.insertCell().innerHTML = `<img src="${image}" alt="${name}" width="20">`;
      row.insertCell().textContent = symbol;
      row.insertCell().textContent = current_price;
      row.insertCell().textContent = total_volume;
    });
  }
  
  // Filter data based on search input
  function filterData() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const table = document.getElementById('coinTable');
    const rows = table.getElementsByTagName('tr');
  
    // Iterate over rows and hide/show based on search term
    for (let i = 1; i < rows.length; i++) {
      const name = rows[i].cells[0].textContent.toLowerCase();
  