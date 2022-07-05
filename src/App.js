import { useState, useEffect } from 'react';
import Tile from './components/Tile';
import Details from './components/Details';

import sunIcon from './icons/sun-solid.svg';
import moonIcon from './icons/moon-solid.svg';
import searchIcon from './icons/magnifying-glass-solid.svg';
import downIcon from './icons/chevron-down-solid.svg';

import './index.css';

let countryInfo = [];

let request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/all', false);

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

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => localStorage.setItem('theme', theme));

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [details, setDetails] = useState({});
  const [renderDetails, setRenderDetails] = useState(false);

  const themeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.body.setAttribute('data-theme', 'light');
    }
  }

  const searchChange = (e) => {
    if (e.which === 13) {
      if (e.target.value !== '') {
        let temp = e.target.value.toLowerCase().split(' ');
        for (let i = 0; i < temp.length; i++) {
          temp[i] = temp[i][0].toUpperCase() + temp[i].slice(1);
        }
        setSearch(temp);
        e.target.value = temp;
      } else {
        setSearch('');
      }
    }
  }

  const toggleFilter = () => {
    const filters = document.getElementById('regionOptions');
    if (filters.classList.contains('hide')) {
      filters.classList.remove('hide');
    } else {
      filters.classList.add('hide');
    }
  }

  const setFilter = (e) => {
    switch (e.target.value) {
      case 'africa':
        setRegion('Africa');
        break;
      case 'americas':
        setRegion('Americas');
        break;
      case 'asia':
        setRegion('Asia');
        break;
      case 'europe':
        setRegion('Europe');
        break;
      case 'oceania':
        setRegion('Oceania');
        break;
      case 'any':
        setRegion('');
        break;
      default:
        console.log(`region doesn't exist`);
    }

    toggleFilter();
  }

  const tileClick = (e) => {
    const country = e.target.value;
    console.log(e.target.value);
    for (let i = 0; i < countryInfo.length; i++) {
      if (countryInfo[i]['name'] === country) {
        setDetails(countryInfo[i]);
      }
    }

    toggleDetails();
  }

  const toggleDetails = () => {
    setRenderDetails(!renderDetails);
  }

  if (!renderDetails) {
    return (
      <div className='app'>
        <header>
          <p className='logo'>Where in the world?</p>
          <button className='themeSwitch' type='button' onClick={themeSwitch}><img alt='' id='themeIcon' src={theme === 'dark' ? moonIcon : sunIcon} />{theme} mode</button>
        </header>
        <main>
          <div className='search'>
            <img className='filter' src={searchIcon} alt='' />
            <input id='searchInput' onKeyDown={searchChange} type='text' placeholder='Search for a country...' />
          </div>
          <div className='regionContainer'>
            <button className='regionFilter' type='button' onClick={toggleFilter}>
              <p>{region === '' ? 'Filter by Region' : region}</p>
              <img src={downIcon} className='filter' alt='' />
            </button>
            <div className='regionOptions hide' id='regionOptions'>
              <button className='regionChoice' type='button' value='africa' onClick={setFilter}>Africa</button>
              <button className='regionChoice' type='button' value='americas' onClick={setFilter}>Americas</button>
              <button className='regionChoice' type='button' value='asia' onClick={setFilter}>Asia</button>
              <button className='regionChoice' type='button' value='europe' onClick={setFilter}>Europe</button>
              <button className='regionChoice' type='button' value='oceania' onClick={setFilter}>Oceania</button>
              <button className='regionChoice' type='button' value='any' onClick={setFilter}>Any</button>
            </div>
          </div>
          <div className='countryGrid'>
            {countryInfo.filter(country => country.name.includes(search) && country.region.includes(region)).map((element, i) => {
              return (
                <Tile
                  name={element['name']}
                  population={element['population']}
                  region={element['region']}
                  capital={element['capital']}
                  flag={element['flag']}
                  key={i}
                  onClick={tileClick}
                />
              )
            })}
          </div>

        </main>
        <footer>

        </footer>
      </div>
    )
  } else {
    return (
      <div className='app'>
        <header>
          <p className='logo'>Where in the world?</p>
          <button className='themeSwitch' type='button' onClick={themeSwitch}><img alt='' id='themeIcon' src={theme === 'dark' ? moonIcon : sunIcon} />{theme} mode</button>
        </header>
        <main>
          <Details country={details} close={toggleDetails} countryInfo={countryInfo} />
        </main>
        <footer>

        </footer>
      </div>
    )
  }
}

export default App;
