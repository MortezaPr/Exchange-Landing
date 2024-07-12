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
    changeCell.innerHTML = `<div class="currency-change">${item.change_24h.toLocaleString(
      "fa-IR"
    )}<img width="20" height="20" src="https://file.sarmayex.com/static/images/new-Landing/trend-down-2.svg"/></div>`;
  } else if (item.change_24h < 0) {
    changeCell.classList.add("descending");
    changeCell.innerHTML = `<div class="currency-change">${item.change_24h.toLocaleString(
      "fa-IR"
    )}<img width="20" height="20" src="https://file.sarmayex.com/static/images/new-Landing/trend-down-3.svg"/></div>`;
  } else {
    changeCell.innerHTML = `${item.change_24h.toLocaleString("fa-IR")}`;
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

  const buyButton = operationCell.querySelector(".btn-buy");
  const sellButton = operationCell.querySelector(".btn-sell");
  const firstDropdown = document.querySelector(".currency-dropdown");

  function updateSelectedClass(operation) {
    const buyNowDiv = document.querySelector(".box-operation div:nth-child(1)");
    const sellNowDiv = document.querySelector(
      ".box-operation div:nth-child(2)"
    );

    if (operation === "buy") {
      buyNowDiv.classList.add("selected");
      sellNowDiv.classList.remove("selected");
    } else if (operation === "sell") {
      sellNowDiv.classList.add("selected");
      buyNowDiv.classList.remove("selected");
    }
  }

  if (buyButton) {
    buyButton.addEventListener("click", function () {
      firstDropdown.value = item.name_en;
      updateSelectedClass("buy");
    });
  }

  if (sellButton) {
    sellButton.addEventListener("click", function () {
      firstDropdown.value = item.name_en;
      updateSelectedClass("sell");
    });
  }
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

const localeNumbers = document.querySelectorAll(".number");

localeNumbers.forEach((element) => {
  const number = parseInt(element.textContent, 10);

  const farsiNumber = number.toLocaleString("fa-IR");

  element.textContent = farsiNumber;
});

fetch("currencies.json")
  .then((response) => response.json())
  .then((currencies) => {
    const dropdowns = document.querySelectorAll(".currency-dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.innerHTML = "";

      currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency.name_en;
        option.textContent = currency.name_en;

        dropdown.appendChild(option);
      });
    });
  })
  .catch((error) => console.error("Error loading the JSON data:", error));

document.addEventListener("DOMContentLoaded", function () {
  const operationDivs = document.querySelectorAll(".box-operation div");

  operationDivs.forEach((div) => {
    div.addEventListener("click", function () {
      operationDivs.forEach((d) => d.classList.remove("selected"));

      this.classList.add("selected");
    });
  });
});

// handle state of the convert box and update the button
document.addEventListener("DOMContentLoaded", function () {
  const operationDivs = document.querySelectorAll(".box-operation div");
  const buyButtonDiv = document.querySelector("#box-button div");

  operationDivs.forEach((div, index) => {
    div.addEventListener("click", function () {
      operationDivs.forEach((d) => d.classList.remove("selected"));

      this.classList.add("selected");

      if (index === 0) {
        buyButtonDiv.childNodes[0].nodeValue = "همین الان بخر";
      } else if (index === 1) {
        buyButtonDiv.childNodes[0].nodeValue = "همین الان بفروش";
      }
    });
  });
});

// when the buy or sell button clicked in currency table, scrolls to the convert section
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("btn-buy") ||
      event.target.classList.contains("btn-sell")
    ) {
      const convertElement = document.getElementById("convert");
      if (convertElement) {
        convertElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
