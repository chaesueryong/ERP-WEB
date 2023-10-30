import FilterItem from '../FilterItem/FilterItem';
import './FilterBox.css';

function FilterBox({title, search_title, filterList=[]}) {

  return (
    <div className="FilterBox">
        <div className='filter-title'>
          {title}
        </div>

        <div className='filter'>
            <div className='search-box' style={search_title ? {} : {display: 'none'}}>
                <div className='input-title'>{search_title}</div>
                <input className='input-box' placeholder='거래처명을 입력해 주세요'></input>
            </div>

            <div className='check-box'>
                <div className='check-title'>검색 필터</div>
                <div className='check-list'>
                    {
                        filterList.map((e, i)=><FilterItem key={i} name={e.name} />)
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default FilterBox;
