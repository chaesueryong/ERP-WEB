import './FilterItem.css';

function FilterItem({name, isCheckButton=true, defaultChecked, handleClickCheckFilter}) {

  return (
    <div className="FilterItem">
        <input id={name} className={`${isCheckButton ? 'check-filter' : 'filter'}`} type='checkbox' style={isCheckButton ? {} : {display: 'none'}} onChange={handleClickCheckFilter} checked={defaultChecked} />
        <label htmlFor={name} className={`${isCheckButton ? 'check-filter' : 'filter'}`}><span>{name === '' ? '빈값' : name}</span></label>
    </div>
  );
}

export default FilterItem;
