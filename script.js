const tableBody = document.querySelector("table");

function appendRow(item, tableBody) {
  const row = tableBody.insertRow();

  const nameCell = row.insertCell();
  nameCell.innerHTML = `<div class="currency-name"><img width="30" height="30" src="${item.image}"/><span class="name-far">${item.name_fa}</span><span class="name-en">${item.name_en}</span></div>`;
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
}

fetch("currencies.json")
  .then((response) => response.json()) // Parse the JSON from the response
  .then((data) => {
    // Iterate over first 5 item in the data array
    data.slice(0, 5).forEach((item) => appendRow(item, tableBody));

    document.getElementById("loadMore").addEventListener("click", function () {
      // Load the rest of the data starting from the 6th item
      data.slice(5).forEach((item) => appendRow(item, tableBody));
      // Delete the button after loading the data
      this.remove();
    });
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
