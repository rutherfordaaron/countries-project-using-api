import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Details from './components/Details';

// Initialize empty array for storing data recieved fromt he API
let countryInfo = [];

// Request from the API
let request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/all', false);

// Once request is loaded, extract needed data
request.onload = () => {
  let data = JSON.parse(request.response);
  data.forEach(country => {
    countryInfo.push(
      {
        'name': country.name.official,
        'nativeName': country.name.nativeName,
        'commonName': country.name.common,
        'population': country.population.toLocaleString("en-US").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        'region': country.region,
        'subRegion': country.subregion,
        'flag': country.flags.png,
        'capital': country.capital ? country.capital[0] : 'N/A',
        'tld': country.tld,
        'currency': country.currencies,
        'languages': country.languages,
        'borders': country.borders,
        'code': country.cca3
      }
    )
  })
}

request.send();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App countryInfo={countryInfo} />} />

        {countryInfo?.map((el, i) => {
          let route = el.name.split('');
          for (let i = 0; i < route.length; i++) {
            if (route[i] === ' ') {
              route[i] = '%20';
            }
          }
          return (
            <Route
              path={`/${route.join('')}`}
              key={`route${i}`}
              element={<Details country={el} countryInfo={countryInfo} />}
            />
          )
        })}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);