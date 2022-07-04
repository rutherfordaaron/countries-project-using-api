import { useState, useEffect } from 'react';
import Tile from './components/Tile';

import sunIcon from './icons/sun-solid.svg';
import moonIcon from './icons/moon-solid.svg';

import './index.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => localStorage.setItem('theme', theme));

  const themeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.body.setAttribute('data-theme', 'light');
    }
  }

  let countryTiles = [];

  let request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/all', false);

  request.onload = () => {
    let data = JSON.parse(request.response);
    data.forEach(country => {
      countryTiles.push(
        {
          name: country.name.official,
          population: country.population,
          region: country.region,
          flag: country.flags.png,
          capital: country.capital ? country.capital[0] : 'N/A'
        }
      )
    })
  }

  request.send();

  return (
    <div className='app'>
      <header>
        <h1>Where in the world?</h1>
        <button className='themeSwitch' type='button' onClick={themeSwitch}><img alt='' id='themeIcon' src={theme === 'dark' ? moonIcon : sunIcon} />{theme} mode</button>
      </header>
      <main>
        <div className='search'>

        </div>
        <div className='countryGrid'>
          {countryTiles.map((element, i) => {
            return (
              <Tile
                name={element.name}
                population={element.population}
                region={element.region}
                capital={element.capital}
                flag={element.flag}
                key={i}
              />
            )
          })}
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;
