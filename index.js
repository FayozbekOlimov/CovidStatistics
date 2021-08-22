const searchBtn = document.getElementById('search-button');
const input = document.getElementById('input-text');
const countryName = document.getElementById('countryName');
const confirmed = document.getElementById('confirmed-all');
const death = document.getElementById('deathsAll');
const recovered = document.getElementById('recoveredAll');
const active = document.getElementById('activeAll');
const form = document.querySelector('form');
const flagImg = document.querySelector('.flag-img');


randomCountry();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getCovidResult(input.value);
});


function randomCountry() {
    const apiCountry = 'https://restcountries.eu/rest/v2/all';
    fetch(apiCountry)
        .then(response => response.json())
        .then(getCountry);
}

function getCountry(data) {
    let randomNumber = Math.floor(Math.random() * 250);
    getCovidResult(data[randomNumber].name);
}

function getCovidResult(country) {
    const apiCovid = `https://api.covid19api.com/live/country/${country}/status/confirmed`;
    fetch(apiCovid)
        .then(response => response.json())
        .then(showResult);
}

function showResult(data) {
    let lastData = data[data.length - 1];
    countryName.innerText = lastData.Country;
    confirmed.innerText = lastData.Confirmed;
    death.innerText = lastData.Deaths;
    recovered.innerText = lastData.Recovered;
    active.innerText = lastData.Active;
    flagImg.src = `https://www.countryflags.io/${lastData.CountryCode}/shiny/64.png`;
    document.querySelector('.fa-flag').style.display = 'none';
}