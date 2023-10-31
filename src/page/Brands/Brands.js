import FilterBox from '../../component/FilterBox/FilterBox';
import './Brands.css';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import { useState } from 'react';

function Brands() {
  const [filterList, setFilterList] = useState(filters);

  return (
    <div className="Brands">
      <FilterBox title='브랜드 관리' search_title='브랜드 찾기' filter_title='검색 필터' filterList={filterList} filter_box_border={false} check={false} />
      
      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='브랜드 등록' bg_color='#495057' font_weight='400' icon={true} color='white' />
          <ButtonNormal name='상품 관리 바로가기' bg_color='#E9ECEF' color='black' />
        </div>
        <div className='list-button-right'>
          <div className='render-count-title'>페이지당 항목수</div>
          <select className='render-count'>
            <option value='10'>10</option>
          </select>
          <ButtonNormal name='인쇄' bg_color='#E9ECEF' color='black' />
          <ButtonNormal name='엑셀 내려받기' bg_color='#E9ECEF' color='black' />
        </div>
      </div>

      <div className='list'></div>

    </div>
  );
}

export default Brands;

const filters = [
  {name: '카테고리'},
  {name: '스포츠의류'},
  {name: '신발'},
];