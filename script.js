const tableBody = document.querySelector("table");

fetch("currencies.json")
  .then((response) => response.json()) // Parse the JSON from the response
  .then((data) => {
    // Iterate over each item in the data array
    data.forEach((item) => {
      const row = tableBody.insertRow();

      // Create cells and append data
      const nameCell = row.insertCell();
      nameCell.innerHTML = `<div class="currency-name"><img width="30" hight="30" src="${item.image}"/><span class="name-far">${item.name_fa}</span><span class="name-en">${item.name_en}</span></div>`;
      nameCell.setAttribute("data-cell", "name");

      const priceCell = row.insertCell();
      priceCell.textContent = `${item.price_usd} $`;
      priceCell.setAttribute("data-cell", "price");

      const changeCell = row.insertCell();
      changeCell.textContent = item.change_24h;
      changeCell.setAttribute("dir", "ltr");
      changeCell.setAttribute("data-cell", "change");

      const operationCell = row.insertCell();
      operationCell.innerHTML = `
        <div class="btn-table">
          ${item.buy_option ? '<button class="btn-buy">خرید</button>' : ""}
          ${item.sell_option ? '<button class="btn-sell">فروش</button>' : ""}
        </div>
      `;
      operationCell.setAttribute("data-cell", "operation");
    });
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
