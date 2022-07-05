const Tile = (props) => {
  return (
    <div className='tile'>
      <img src={props.flag} className='flag' alt={`${props.name} flag`} />
      <div className="tileText">
        <p className='countryName'>{props.name}</p>
        <p className='noSpace'><span className='boldText'>Common Name</span>: {props.commonName}</p>
        <p className='noSpace'><span className='boldText'>Population</span>: {props.population}</p>
        <p className='noSpace'><span className='boldText'>Region</span>: {props.region}</p>
        <p className='noSpace'><span className='boldText'>Capital</span>: {props.capital}</p>
      </div>
      <button type='button' onClick={props.onClick} value={props.name} className='psuedoButton' />
    </div>
  )
}

export default Tile;