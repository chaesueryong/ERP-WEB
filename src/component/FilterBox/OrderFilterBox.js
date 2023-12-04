import './OrderFilterBox.css';

function OrderFilterBox({filterTitle, tapList, dateType, selectTitle, handleClickTap}) {


  return (
    <div className="OrderFilterBox">
         <div className='order-filter-title'>
          {filterTitle}
        </div>

        <div className='order-filter-switch-box'>
            {
                tapList.map((e, i) => (
                    <div className='of-switch' onClick={() => handleClickTap(i, 'tap')}>
                        <div className='of-switch-title' style={e.checked ? { color: 'black'} : { color: '#ADB5BD'}}>{e.name}</div>
                        <div className='of-switch-under-bar' style={e.checked ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}></div>
                    </div>
                ))
            }
        </div>

        <div className='of-bottom-box'>
          <div className='of-bottom-left-box'>
            <div className='ofbl-title'>{selectTitle}</div>

            <div className='ofbl-select-box'>
              <select className='ofbl-select'>
                <option>선택</option>
              </select>
              <div className='ofbl-selct-all'>전체</div>
            </div>
          </div>

          <div className='ofbr-date-box'>
            <div className='ofbr-date-title'>기간</div>

            <div className='ofbr-date-box-1'>
                <div className='ofbr-date-list-box'>
                    {
                        dateType.map((e, i) => (
                            <div onClick={() => handleClickTap(i, 'date')} style={e.checked ? {color: 'white', backgroundColor: 'black'} : {color: 'black', backgroundColor: 'white'}}>
                                {e.name}
                            </div>
                        ))
                    }
                </div>

                <div className='ofbr-date-set-box'>
                <input value={'2023.23.12'} />
                <span>~</span>
                <input value={'2023.23.12'} />
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default OrderFilterBox;
