import { useState } from 'react';
import backIcon from '../icons/arrow-left-long-solid.svg';

const Details = (props) => {
  let [country, setCountry] = useState(props.country)
  const nativeNameArr = Object.keys(country.nativeName)
  const currenciesArr = Object.keys(country.currency);
  const languagesArr = Object.keys(country.languages);
  let countryLanguages = '';
  let borderCountries = [];

  for (let i = 0; i < props.countryInfo.length; i++) {
    if (country.borders.indexOf(props.countryInfo[i].code) != -1) {
      borderCountries.push({
        name: props.countryInfo[i].name,
        commonName: props.countryInfo[i].commonName
      });
    }
  }

  for (let i = 0; i < languagesArr.length; i++) {
    if (i !== languagesArr.length - 1) {
      countryLanguages += `${country.languages[languagesArr[i]]}, `;
    } else {
      countryLanguages += country.languages[languagesArr[i]];
    }
  }

  const borderClick = (e) => {
    let newCountry = {}
    for (let i = 0; i < props.countryInfo.length; i++) {
      if (props.countryInfo[i].name === e.target.value) {
        newCountry = props.countryInfo[i];
        console.log(newCountry.name);
      }
    }
    setCountry(newCountry);
  }

  return (
    <div className="details" id='details'>
      <button onClick={props.close} className='backButton'>
        <img src={backIcon} alt='' className='filter' />
        <p>Back</p>
      </button>
      <div className='detailsContent'>
        <img src={country.flag} alt={`${country.name} flag`} className='flag' />
        <div className='detailsInfo'>
          <h1>{country.name}</h1>
          <div className='detailsText'>
            <div classNamem='left'>
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
          <p>Border Countries:</p>
          <div class='borderContainer'>
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
      </div>
    </div>
  )
}

export default Details;