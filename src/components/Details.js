import { useState } from 'react';
import { Link } from 'react-router-dom'
import backIcon from '../icons/arrow-left-long-solid.svg';

const Details = (props) => {
  // State for what country to display details for
  let [country, setCountry] = useState(props.country)

  // Convert some object to arrays for access since I won't know the key values
  const nativeNameArr = Object.keys(country.nativeName)
  const currenciesArr = Object.keys(country.currency);
  const languagesArr = Object.keys(country.languages);

  // Initialize some empty variables for adding into
  let countryLanguages = '';
  let borderCountries = [];

  // Get the official and common names of the border countries from the data provided and put it in the borderCountries array
  for (let i = 0; i < props.countryInfo.length; i++) {
    if (country.borders !== undefined && country.borders.indexOf(props.countryInfo[i].code) !== -1) {
      borderCountries.push({
        name: props.countryInfo[i].name,
        commonName: props.countryInfo[i].commonName
      });
    }
  }

  // Scroll to top when called
  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Extract languages from data and put it all into one string
  for (let i = 0; i < languagesArr.length; i++) {
    if (i !== languagesArr.length - 1) {
      countryLanguages += `${country.languages[languagesArr[i]]}, `;
    } else {
      countryLanguages += country.languages[languagesArr[i]];
    }
  }

  // Change shich country details are displayed when a border country button is clicked
  // Then scroll to top
  const borderClick = (e) => {
    let newCountry = {}
    for (let i = 0; i < props.countryInfo.length; i++) {
      if (props.countryInfo[i].name === e.target.value) {
        newCountry = props.countryInfo[i];
      }
    }
    setCountry(newCountry);
    toTop();
  }

  return (
    <div className="details" id='details'>
      <Link to="/" className='backButton'>
        <img src={backIcon} alt='' className='filter' />
        <p>Back</p>
      </Link>
      <main className='detailsContent'>
        <img src={country.flag} alt={`${country.name} flag`} className='flag' />
        <div className='detailsInfo'>
          <h1>{country.name}</h1>
          <div className='detailsText'>
            <div className='left'>
              <p>
                <span className="boldText">Common Name</span>
                <span className='weakText'>: {country.commonName}</span>
              </p>
              <p>
                <span className="boldText">Native Name</span>
                <span className='weakText'>: {country.nativeName[nativeNameArr[0]].common}</span>
              </p>
              <p>
                <span className="boldText">Population</span>
                <span className='weakText'>: {country.population}</span>
              </p>
              <p>
                <span className="boldText">Sub Region</span>
                <span className='weakText'>: {country.subRegion}</span>
              </p>
              <p>
                <span className="boldText">Capital</span>
                <span className='weakText'>: {country.capital}</span>
              </p>
            </div>
            <div className='right'>
              <p>
                <span className="boldText">Top Level Domain</span>
                <span className='weakText'>: {country.tld}</span>
              </p>
              <p>
                <span className="boldText">Currency</span>
                <span className='weakText'>: {country.currency[currenciesArr[0]].name}</span>
              </p>
              <p>
                <span className="boldText">Languages</span>
                <span className='weakText'>: {countryLanguages}</span>
              </p>
            </div>
          </div>
          <h2>Border Countries:</h2>
          <div className='borderContainer'>
            {borderCountries.map((el, i) => {
              return (
                <button
                  className='borderButton'
                  type='button' value={el.name}
                  key={i}
                  onClick={borderClick}
                >
                  {el.commonName}
                </button>
              )
            })}
          </div>
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

export default Details;