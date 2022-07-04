const Tile = (props) => {
  return (
    <button className='tile' type='button'>
      <img src={props.flag} className='flag' alt={`${props.name} flag`} />
      <div className="tileText">
        <p className='countryName'>{props.name}</p>
        <p className='noSpace'><span className='boldText'>Population</span>: {props.population}</p>
        <p className='noSpace'><span className='boldText'>Region</span>: {props.region}</p>
        <p className='noSpace'><span className='boldText'>Capital</span>: {props.capital}</p>
      </div>
    </button>
  )
}

export default Tile;