const dropList = document.querySelectorAll(".list select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");
    let country = {
        "AED": "AE",
        "AUD": "AU",
        "DZD": "DZ",
        "AFN": "AF",
        "IDR": "ID",
        "ILS": "IL",
        "INR": "IN",
        "IQD": "IQ",
        "IRR": "IR",  
        "KRW": "KR",
        "KWD": "KW",
        "NZD": "NZ",
        "PHP": "PH",
        "PKR": "PK",
        "USD": "US",  
    };
for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country) {
        let selected;
        if (i == 0) {
            selected = currency_code == "INR" ? "selected" : "";
        } else {
            if (i == 1) {
                selected = currency_code == "PKR" ? "selected" : "";
            }
        }
     
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;  
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
       flagloading(e.target); 
    });
}

function flagloading(element) {
    for (code in country) {
        if (code == element.value) { 
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country[code]}/flat/64.png`
        }
    }
}
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; 
    fromCurrency.value = toCurrency.value; 
    toCurrency.value = tempCode; 
    flagloading(fromCurrency); 
    flagloading(toCurrency); 
});

function getExchangeRate() {
    const amount = document.querySelector(".num input"),
        exchangeRateTxt = document.querySelector(".convert");
    let amountVal = amount.value;

    let url = `https://v6.exchangerate-api.com/v6/521ec5eba5748c29b910c85b/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => { 
        exchangeRateTxt.innerText = "error";
    });
}
