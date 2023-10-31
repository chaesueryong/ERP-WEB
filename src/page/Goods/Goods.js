import './Goods.css';
import FilterBox from '../../component/FilterBox/FilterBox';
import ButtonNormal from '../../component/ButtonNormal/ButtonNormal';
import { useState } from 'react';

function Goods() {
  const [filterList, setFilterList] = useState(filters);

  return (
    <div className="Goods">
      <FilterBox title='상품관리' filter_title='필터' filterList={filterList} filter_box_border={false} />

      <div className='list-button'>
        <div className='list-button-left'>
          <ButtonNormal name='상품 등록' bg_color='#495057' font_weight="400" color='white' />
          <ButtonNormal name='상품 발주/반품' bg_color='#495057' font_weight="400" color='white' />
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

export default Goods;


const filters = [
  {name: '업종 분류'},
  {name: '브랜드 수'},
  {name: '대표자'},
  {name: '대표자 연락처'},
  {name: '담당자'},
  {name: '당담자 연락처'},
  {name: '주소'},
  {name: '현 잔액'},
  {name: '팩스'},
  {name: '도매 주소'},
  {name: '계좌 번호'},
  {name: '홈페이지'},
  {name: '비고'},
  {name: '지급 방식'},
  {name: '등록 일자'},
];