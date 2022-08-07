import { Link } from 'react-router-dom'

const Tile = (props) => {
  return (
    <Link to={props.name} className='tile'>
      <img src={props.flag} className='flag' alt={`${props.name} flag`} />
      <div className="tileText">
        <p className='countryName'>{props.name}</p>
        <p className='noSpace'><span className='boldText'>Common Name</span>: {props.commonName}</p>
        <p className='noSpace'><span className='boldText'>Population</span>: {props.population}</p>
        <p className='noSpace'><span className='boldText'>Region</span>: {props.region}</p>
        <p className='noSpace'><span className='boldText'>Capital</span>: {props.capital}</p>
      </div>
      <button type='button' onClick={props.onClick} value={props.name} className='psuedoButton'>Country Details</button>
    </Link>
  )
}

export default Tile;