import './FilterItem.css';

function FilterItem({name, check=true, defaultChecked, handleClickCheckFilter}) {

  return (
    <div className="FilterItem">
        <input id={name} className={`${check ? 'check-filter' : 'filter'}`} type='checkbox' style={check ? {} : {display: 'none'}} onChange={handleClickCheckFilter} defaultChecked={defaultChecked} />
        <label htmlFor={name} className={`${check ? 'check-filter' : 'filter'}`}><span>{name}</span></label>
    </div>
  );
}

export default FilterItem;
