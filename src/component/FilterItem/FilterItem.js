import './FilterItem.css';

function FilterItem({name}) {

  return (
    <div className="FilterItem">
        <input id={name} className='check-filter' type='checkbox' />
        <label for={name}><span>{name}</span></label>
    </div>
  );
}

export default FilterItem;
