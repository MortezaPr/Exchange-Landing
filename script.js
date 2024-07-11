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
  if (item.change_24h > 0) {
    changeCell.classList.add("ascending");
    changeCell.innerHTML = `<div class="currency-change">${item.change_24h}<img width="20" height="20" src="https://file.sarmayex.com/static/images/new-Landing/trend-down-2.svg"/></div>`;
  } else if (item.change_24h < 0) {
    changeCell.classList.add("descending");
    changeCell.innerHTML = `<div class="currency-change">${item.change_24h}<img width="20" height="20" src="https://file.sarmayex.com/static/images/new-Landing/trend-down-3.svg"/></div>`;
  }

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

document.querySelector(".menu").addEventListener("click", function () {
  document.querySelector(".sidebar-open").style.display = "block";
});

document.getElementById("close-sidebar").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar-open");
  sidebar.classList.add("sidebar-close");
  setTimeout(() => {
    sidebar.style.display = "none";
    sidebar.classList.remove("sidebar-close");
  }, 500);
});

const desktopBreakpoint = 850;

// Function to close the sidebar
function closeSidebar() {
  const sidebar = document.querySelector(".sidebar-open");
  sidebar.style.display = "none";
}

window.addEventListener("resize", function () {
  if (window.innerWidth >= desktopBreakpoint) {
    closeSidebar();
  }
});
