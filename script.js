const btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdownSelects = document.querySelectorAll(".dropdown select");

for (let i = 0; i < dropdownSelects.length; i++) {
  const selectElem = dropdownSelects[i];
  for (code in countryList) {
    // console.log(code, countryList[code]);
    let optionElem = document.createElement("option");
    optionElem.value = code;
    optionElem.innerText = code;
    if (selectElem.name === "from" && code === "USD") {
      optionElem.selected = "selected";
    } else if (selectElem.name === "to" && code === "INR") {
      optionElem.selected = "selected";
    }
    selectElem.appendChild(optionElem);
  }
  selectElem.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  // console.log(element);
  let currencycode = element.value; // inr
  // console.log(currencycode);
  let countryCode = countryList[currencycode]; // in
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

async function updateExchanerate() {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 0) {
    amountVal = 1;
    amount.value = "1";
  }

  const exchangeRateValue = await getExchangeRate(
    fromCurr.value.toLowerCase(),
    toCurr.value.toLowerCase()
  );
  let finalAmount = amountVal * exchangeRateValue;
  console.log(finalAmount);

  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  } `;
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchanerate();
});

window.addEventListener("load", () => {
  updateExchanerate();
});

async function getExchangeRate(fromCurrency, toCurrency) {
  const base_url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const URL = `${base_url}/${fromCurrency}.json`;
  const result = await fetch(URL);
  const data = await result.json();

  const exchangeRates = data[fromCurrency];
  const toExchangeRate = exchangeRates[toCurrency];

  return toExchangeRate;
}
