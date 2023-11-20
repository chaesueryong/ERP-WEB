import FilterItem from '../FilterItem/FilterItem';
import './FilterBox.css';

function FilterBox({title, search_title, search, search_placeholder, filter_title, check=true, handleChangeSearch, handleClickCheckFilter, filterList=[], filter_box_border=true}) {
  
  return (
    <div className="FilterBox">
        <div className='filter-title'>
          {title}
        </div>

        <div className='filter'>
            <div className='search-box' style={search_title ? {} : {display: 'none'}}>
                <div className='input-title'>{search_title}</div>
                <input className='input-box' value={search} placeholder={search_placeholder} onChange={handleChangeSearch}></input>
            </div>

            <div className='check-box'>
                <div className='check-title'>{filter_title}</div>
                <div className='check-list' style={filter_box_border ? {} : {border: 'none', padding: '10px 0'}}>
                    {
                        filterList.map((e, i)=><FilterItem key={i} name={e.name} check={check} defaultChecked={e.default} handleClickCheckFilter={handleClickCheckFilter} />)
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default FilterBox;
