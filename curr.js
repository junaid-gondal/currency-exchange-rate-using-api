const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");


for (let select of dropdowns) {
    for (let currcode in countryList) {

        let option = document.createElement("option");
        option.innerText = currcode;
        option.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            option.selected = true;
        }
        else if (select.name === "to" && currcode === "PKR") {
            option.selected = true;
        }

        select.append(option);
    }

    select.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];

    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};


btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateexchangerate();
});


const updateexchangerate = async () => {

    let amtval = amountInput.value;

    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amountInput.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate =
            data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

        let finalamount = amtval * rate;

        msg.innerText =
            `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;

    } catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.log(error);
    }
};


window.addEventListener("load", () => {
    updateexchangerate();
});