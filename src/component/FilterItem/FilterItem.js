import './FilterItem.css';

function FilterItem({name, check=true}) {

  return (
    <div className="FilterItem">
        <input id={name} className={`${check ? 'check-filter' : 'filter'}`} type='checkbox' style={check ? {} : {display: 'none'}} />
        <label htmlFor={name} className={`${check ? 'check-filter' : 'filter'}`}><span>{name}</span></label>
    </div>
  );
}

export default FilterItem;
