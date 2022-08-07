import { useState, useEffect } from 'react';
import Tile from './components/Tile';

import sunIcon from './icons/sun-solid.svg';
import moonIcon from './icons/moon-solid.svg';
import searchIcon from './icons/magnifying-glass-solid.svg';
import downIcon from './icons/chevron-down-solid.svg';

import './index.css';

const App = (props) => {
  // State to store light mode and dark mode
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  // Store theme in local storage to persist over refresh and close
  useEffect(() => localStorage.setItem('theme', theme));

  // State variables to hold the current search, the region to filter by, the country to show details from, and a boolean if details should be rendered
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [details, setDetails] = useState({});
  const [renderDetails, setRenderDetails] = useState(false);

  // Swap the theme from light to dark or vice versa
  const themeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.body.setAttribute('data-theme', 'light');
    }
  }

  // Change search parameters when the magnifying glass is clicked
  const handleIconClick = () => {
    changeSearch();
  }

  // Change search parameters when enter is pressed while typing in the search bar
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      changeSearch();
    }
  }

  // Change serach parameters to be the value of what's in the search bar
  const changeSearch = () => {
    const input = document.getElementById('searchInput');
    setSearch(input.value);
  }

  // Toggle the region filter options between visible and hidden
  const toggleFilter = () => {
    const filters = document.getElementById('regionOptions');
    filters.classList.toggle('hide');
  }

  // Set the region filter to the selected region
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

  // Scroll to the top of the page
  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // When a country tile is clicked, set details to the country that was selected
  // Scroll to the top and render the details
  const tileClick = (e) => {
    const country = e.target.value;
    console.log(e.target.value);
    for (let i = 0; i < props.countryInfo.length; i++) {
      if (props.countryInfo[i]['name'] === country) {
        setDetails(props.countryInfo[i]);
      }
    }

    setSearch('');
    toTop();
    toggleDetails();
  }

  // Toggle between details and main page
  const toggleDetails = () => {
    setRenderDetails(!renderDetails);
  }

  // If renderDetails is not true, render app, otherwise render details
  return (
    <div className='app'>
      <header>
        <p className='logo'>Where in the world?</p>
        <button className='themeSwitch' type='button' onClick={themeSwitch}><img alt='' id='themeIcon' src={theme === 'dark' ? moonIcon : sunIcon} />{theme} mode</button>
      </header>
      <main>
        <div className='search'>
          <img className='filter' id='serchIcon' src={searchIcon} alt='' onClick={handleIconClick} />
          <input id='searchInput' onKeyDown={handleKeyPress} type='text' placeholder='Search for a country...' />
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
          {props.countryInfo.filter(country => (country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)) || (country.commonName.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region))).map((element, i) => {
            return (
              <Tile
                name={element['name']}
                commonName={element['commonName']}
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
        <p>Coded by <a href='github.com/Hazipan'>Aaron Rutherford</a>.</p>
        <p>Project by <a href='frontendmentor.io'>Frontend Mentor</a>.</p>
        <a href='github.com/Hazipan/countries-project-using-api'>See the code!</a>
      </footer>
    </div>
  )
}

export default App;
